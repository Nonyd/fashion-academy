import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULTS } from "@/lib/constants";

export async function findTeacherById(id: string) {
  return prisma.teacher.findUnique({
    where: { id },
    include: { user: true, courses: true },
  });
}

export async function findTeacherByUserId(userId: string) {
  return prisma.teacher.findUnique({
    where: { userId },
    include: { user: true, courses: true },
  });
}

export async function findAllTeachers(
  filters: { search?: string },
  pagination: { page: number; limit: number }
) {
  const skip = (pagination.page - 1) * pagination.limit;
  const where: Record<string, unknown> = {};
  if (filters.search) {
    where.user = {
      OR: [
        { firstName: { contains: filters.search, mode: "insensitive" } },
        { lastName: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
      ],
    };
  }
  const [items, total] = await Promise.all([
    prisma.teacher.findMany({
      where,
      skip,
      take: pagination.limit ?? PAGINATION_DEFAULTS.LIMIT,
      include: { user: true, courses: true },
    }),
    prisma.teacher.count({ where }),
  ]);
  return { items, total };
}

export async function getTeacherWithCourses(teacherId: string) {
  return prisma.teacher.findUnique({
    where: { id: teacherId },
    include: { user: true, courses: true },
  });
}

export async function getTeacherDashboardData(teacherId: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
    include: { user: true, courses: { include: { _count: { select: { projects: true } } } } },
  });
  if (!teacher) return null;
  const pendingProjects = await prisma.project.count({
    where: {
      courseId: { in: teacher.courses.map((c) => c.id) },
      status: "SUBMITTED",
    },
  });
  return { ...teacher, pendingProjects };
}
