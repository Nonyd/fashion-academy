import { ProjectStatus } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULTS } from "@/lib/constants";

type Filters = {
  studentId?: string;
  courseId?: string;
  status?: string;
  teacherId?: string;
  dateFrom?: string;
  dateTo?: string;
};

export async function createProject(data: {
  studentId: string;
  courseId: string;
  title: string;
  description?: string;
  fileUrl: string;
  thumbnailUrl?: string;
}) {
  return prisma.project.create({ data });
}

export async function updateProject(
  projectId: string,
  data: { status?: string; teacherFeedback?: string; grade?: number; reviewedById?: string }
) {
  return prisma.project.update({
    where: { id: projectId },
    data: {
      status: data.status as ProjectStatus | undefined,
      teacherFeedback: data.teacherFeedback,
      grade: data.grade,
      reviewedById: data.reviewedById,
      reviewedAt: data.status ? new Date() : undefined,
    },
  });
}

export async function findProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: { student: { include: { user: true } }, course: true },
  });
}

export async function findProjectsByStudent(studentId: string, filters: Filters) {
  const where: Record<string, unknown> = { studentId };
  if (filters.courseId) where.courseId = filters.courseId;
  if (filters.status) where.status = filters.status;
  return prisma.project.findMany({
    where,
    include: { course: true },
    orderBy: { submittedAt: "desc" },
  });
}

export async function findProjectsByTeacher(teacherId: string, filters: Filters) {
  const where: Record<string, unknown> = { course: { teacherId } };
  if (filters.status) where.status = filters.status;
  return prisma.project.findMany({
    where,
    include: { student: { include: { user: true } }, course: true },
    orderBy: { submittedAt: "desc" },
  });
}

export async function findAllProjects(filters: Filters, pagination: { page: number; limit: number }) {
  const skip = (pagination.page - 1) * pagination.limit;
  const where: Record<string, unknown> = {};
  if (filters.studentId) where.studentId = filters.studentId;
  if (filters.courseId) where.courseId = filters.courseId;
  if (filters.status) where.status = filters.status;
  if (filters.teacherId) where.course = { teacherId: filters.teacherId };
  const [items, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip,
      take: pagination.limit ?? PAGINATION_DEFAULTS.LIMIT,
      include: { student: { include: { user: true } }, course: true },
    }),
    prisma.project.count({ where }),
  ]);
  return { items, total };
}

export async function getPendingProjectsCount(teacherId: string) {
  return prisma.project.count({
    where: { course: { teacherId }, status: "SUBMITTED" },
  });
}
