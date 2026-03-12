import prisma from "@/lib/prisma";
import { NotFoundError } from "@/lib/errors";
import * as authService from "@/modules/auth/service";
import * as userQueries from "@/modules/users/queries";
import * as teacherQueries from "./queries";

export async function getTeacherProfile(teacherId: string) {
  const t = await teacherQueries.findTeacherById(teacherId);
  if (!t) throw new NotFoundError("Teacher");
  return t;
}

export async function getTeacherDashboard(userId: string) {
  const t = await teacherQueries.findTeacherByUserId(userId);
  if (!t) throw new NotFoundError("Teacher");
  const data = await teacherQueries.getTeacherDashboardData(t.id);
  if (!data) throw new NotFoundError("Teacher");
  return data;
}

export async function updateTeacherProfile(
  userId: string,
  input: { firstName?: string; lastName?: string; title?: string; bio?: string }
) {
  await userQueries.updateUser(userId, {
    firstName: input.firstName,
    lastName: input.lastName,
  });
  const t = await teacherQueries.findTeacherByUserId(userId);
  if (!t) throw new NotFoundError("Teacher");
  if (input.title !== undefined || input.bio !== undefined) {
    await prisma.teacher.update({
      where: { id: t.id },
      data: { title: input.title, bio: input.bio },
    });
  }
  return teacherQueries.findTeacherById(t.id);
}

export async function listTeachers(filters: { search?: string }, pagination: { page: number; limit: number }) {
  return teacherQueries.findAllTeachers(filters, pagination);
}

export async function assignCourseToTeacher(teacherId: string, courseId: string) {
  await prisma.course.update({
    where: { id: courseId },
    data: { teacherId },
  });
}

export async function removeCourseFromTeacher(teacherId: string, courseId: string) {
  const course = await prisma.course.findFirst({
    where: { id: courseId, teacherId },
  });
  if (course) {
    await prisma.course.update({
      where: { id: courseId },
      data: { teacherId: "" },
    });
  }
}
