import prisma from "@/lib/prisma";
import { calculateGrade } from "@/lib/constants";
import { PAGINATION_DEFAULTS } from "@/lib/constants";

type Filters = {
  studentId?: string;
  courseId?: string;
  teacherId?: string;
  semester?: number;
  assessmentType?: string;
  minScore?: number;
  maxScore?: number;
};

export async function createScore(data: {
  studentId: string;
  courseId: string;
  score: number;
  assessmentType: string;
  semester: number;
  feedback?: string;
}) {
  const letterGrade = calculateGrade(data.score);
  return prisma.score.create({
    data: { ...data, letterGrade },
  });
}

export async function updateScore(
  scoreId: string,
  data: { score?: number; feedback?: string }
) {
  const letterGrade = data.score != null ? calculateGrade(data.score) : undefined;
  return prisma.score.update({
    where: { id: scoreId },
    data: { ...data, letterGrade },
  });
}

export async function deleteScore(scoreId: string) {
  return prisma.score.delete({ where: { id: scoreId } });
}

export async function findScoreById(id: string) {
  return prisma.score.findUnique({
    where: { id },
    include: { student: { include: { user: true } }, course: true },
  });
}

export async function findScoresByStudent(studentId: string, filters: Filters) {
  const where: Record<string, unknown> = { studentId };
  if (filters.semester) where.semester = filters.semester;
  if (filters.assessmentType) where.assessmentType = filters.assessmentType;
  if (filters.minScore != null) where.score = { ...((where.score as object) || {}), gte: filters.minScore };
  if (filters.maxScore != null) where.score = { ...((where.score as object) || {}), lte: filters.maxScore };
  return prisma.score.findMany({
    where,
    include: { course: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function findScoresByCourse(courseId: string, filters: Filters) {
  const where: Record<string, unknown> = { courseId };
  if (filters.semester) where.semester = filters.semester;
  return prisma.score.findMany({
    where,
    include: { student: { include: { user: true } } },
  });
}

export async function findAllScores(filters: Filters, pagination: { page: number; limit: number }) {
  const skip = (pagination.page - 1) * pagination.limit;
  const where: Record<string, unknown> = {};
  if (filters.studentId) where.studentId = filters.studentId;
  if (filters.courseId) where.courseId = filters.courseId;
  if (filters.teacherId) where.course = { teacherId: filters.teacherId };
  if (filters.semester) where.semester = filters.semester;
  if (filters.assessmentType) where.assessmentType = filters.assessmentType;
  if (filters.minScore != null) where.score = { gte: filters.minScore };
  if (filters.maxScore != null) where.score = { ...((where.score as object) || {}), lte: filters.maxScore };
  const [items, total] = await Promise.all([
    prisma.score.findMany({
      where,
      skip,
      take: pagination.limit ?? PAGINATION_DEFAULTS.LIMIT,
      include: { student: { include: { user: true } }, course: true },
    }),
    prisma.score.count({ where }),
  ]);
  return { items, total };
}

export async function getStudentGPA(studentId: string): Promise<number> {
  const scores = await prisma.score.findMany({ where: { studentId } });
  if (scores.length === 0) return 0;
  const sum = scores.reduce((a, s) => a + s.score, 0);
  return Math.round((sum / scores.length) * 100) / 100;
}
