import prisma from "@/lib/prisma";
import { PAGINATION_DEFAULTS } from "@/lib/constants";

type Filters = { program?: string; semester?: number; teacherId?: string; search?: string };

export async function createCourse(data: {
  title: string;
  code: string;
  description?: string;
  program: string;
  semester: number;
  teacherId?: string;
}) {
  return prisma.course.create({
    data: {
      ...data,
      teacherId: data.teacherId ?? undefined,
    },
  });
}

export async function updateCourse(
  courseId: string,
  data: { title?: string; code?: string; description?: string; program?: string; semester?: number; teacherId?: string }
) {
  return prisma.course.update({
    where: { id: courseId },
    data,
  });
}

export async function archiveCourse(courseId: string) {
  return prisma.course.update({
    where: { id: courseId },
    data: { isArchived: true },
  });
}

export async function findCourseById(id: string) {
  return prisma.course.findUnique({
    where: { id },
    include: { teacher: { include: { user: true } }, enrollments: { include: { student: { include: { user: true } } } } },
  });
}

export async function findCourseByCode(code: string) {
  return prisma.course.findUnique({ where: { code } });
}

export async function findAllCourses(filters: Filters, pagination: { page: number; limit: number }) {
  const skip = (pagination.page - 1) * pagination.limit;
  const where: Record<string, unknown> = { isArchived: false };
  if (filters.program) where.program = filters.program;
  if (filters.semester) where.semester = filters.semester;
  if (filters.teacherId) where.teacherId = filters.teacherId;
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { code: { contains: filters.search, mode: "insensitive" } },
    ];
  }
  const [items, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip,
      take: pagination.limit ?? PAGINATION_DEFAULTS.LIMIT,
      include: { teacher: { include: { user: true } } },
    }),
    prisma.course.count({ where }),
  ]);
  return { items, total };
}

export async function enrollStudent(studentId: string, courseId: string) {
  return prisma.enrollment.create({
    data: { studentId, courseId },
  });
}

export async function unenrollStudent(studentId: string, courseId: string) {
  return prisma.enrollment.delete({
    where: { studentId_courseId: { studentId, courseId } },
  });
}

export async function getStudentCourses(studentId: string) {
  return prisma.enrollment.findMany({
    where: { studentId },
    include: { course: { include: { teacher: { include: { user: true } } } } },
  });
}

export async function getTeacherCourses(teacherId: string) {
  return prisma.course.findMany({
    where: { teacherId },
    include: { _count: { select: { enrollments: true } } },
  });
}
