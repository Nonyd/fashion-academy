import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULTS } from "@/lib/constants";
import type { PaginationInput } from "@/lib/validators";

type StudentFilters = { program?: string; intakeYear?: number; enrollmentStatus?: string; search?: string };

export async function findStudentById(id: string) {
  return prisma.student.findUnique({
    where: { id },
    include: { user: true },
  });
}

export async function findStudentByUserId(userId: string) {
  return prisma.student.findUnique({
    where: { userId },
    include: { user: true },
  });
}

export async function findStudentByRegNumber(regNumber: string) {
  return prisma.student.findUnique({
    where: { regNumber },
    include: { user: true },
  });
}

export async function findAllStudents(filters: StudentFilters, pagination: PaginationInput) {
  const { page = PAGINATION_DEFAULTS.PAGE, limit = PAGINATION_DEFAULTS.LIMIT } = pagination;
  const skip = (page - 1) * limit;
  const where: Record<string, unknown> = {};
  if (filters.program) where.program = filters.program;
  if (filters.intakeYear) where.intakeYear = filters.intakeYear;
  if (filters.enrollmentStatus) where.enrollmentStatus = filters.enrollmentStatus;
  if (filters.search) {
    where.OR = [
      { regNumber: { contains: filters.search, mode: "insensitive" } },
      { user: { firstName: { contains: filters.search, mode: "insensitive" } } },
      { user: { lastName: { contains: filters.search, mode: "insensitive" } } },
      { user: { email: { contains: filters.search, mode: "insensitive" } } },
    ];
  }
  const [items, total] = await Promise.all([
    prisma.student.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),
    prisma.student.count({ where }),
  ]);
  return { items, total };
}

export async function countStudents(filters: StudentFilters) {
  const where: Record<string, unknown> = {};
  if (filters.program) where.program = filters.program;
  if (filters.intakeYear) where.intakeYear = filters.intakeYear;
  if (filters.enrollmentStatus) where.enrollmentStatus = filters.enrollmentStatus;
  if (filters.search) {
    where.OR = [
      { regNumber: { contains: filters.search, mode: "insensitive" } },
      { user: { firstName: { contains: filters.search, mode: "insensitive" } } },
      { user: { lastName: { contains: filters.search, mode: "insensitive" } } },
      { user: { email: { contains: filters.search, mode: "insensitive" } } },
    ];
  }
  return prisma.student.count({ where });
}

export async function updateStudent(
  studentId: string,
  data: { program?: string; intakeYear?: number; enrollmentStatus?: string }
) {
  return prisma.student.update({
    where: { id: studentId },
    data,
  });
}

export async function getStudentDashboardData(studentId: string) {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      user: true,
      scores: { take: 5, orderBy: { createdAt: "desc" }, include: { course: true } },
      projects: { take: 5, orderBy: { submittedAt: "desc" }, include: { course: true } },
      payments: { take: 5, orderBy: { createdAt: "desc" } },
    },
  });
  if (!student) return null;
  const notifications = await prisma.notification.findMany({
    where: { userId: student.userId },
    take: 10,
    orderBy: { createdAt: "desc" },
  });
  return { student, notifications };
}

export async function getStudentGPA(studentId: string): Promise<number> {
  const scores = await prisma.score.findMany({
    where: { studentId },
  });
  if (scores.length === 0) return 0;
  const sum = scores.reduce((a, s) => a + s.score, 0);
  return Math.round((sum / scores.length) * 100) / 100;
}
