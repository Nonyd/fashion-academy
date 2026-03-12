import prisma from "@/lib/prisma";
import { NotFoundError, ForbiddenError } from "@/lib/errors";
import * as mailService from "@/modules/mail/service";
import * as projectQueries from "./queries";

export async function submitProject(
  input: { title: string; description?: string; courseId: string; fileUrl: string; thumbnailUrl?: string },
  userId: string
) {
  const student = await prisma.student.findUnique({ where: { userId } });
  if (!student) throw new NotFoundError("Student");
  const enrollment = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId: student.id, courseId: input.courseId } },
  });
  if (!enrollment) throw new ForbiddenError("You are not enrolled in this course");
  const project = await projectQueries.createProject({
    ...input,
    studentId: student.id,
  });
  const course = await prisma.course.findUnique({ where: { id: input.courseId }, include: { teacher: true } });
  if (course?.teacher?.userId) {
    await mailService.triggerAutoMail("PROJECT_REVIEWED", course.teacher.userId, {
      courseName: course.title,
      firstName: student.id,
    });
  }
  return project;
}

export async function reviewProject(
  projectId: string,
  review: { status: "APPROVED" | "REJECTED" | "REVISION_REQUESTED"; teacherFeedback: string; grade?: number },
  teacherId: string
) {
  const project = await projectQueries.findProjectById(projectId);
  if (!project) throw new NotFoundError("Project");
  const course = await prisma.course.findFirst({
    where: { id: project.courseId, teacherId },
  });
  if (!course) throw new ForbiddenError("You do not teach this course");
  await projectQueries.updateProject(projectId, {
    ...review,
    reviewedById: teacherId,
  });
  await mailService.triggerAutoMail("PROJECT_REVIEWED", project.student.userId, {
    courseName: course.title,
    firstName: project.student.user.firstName,
    status: review.status,
  });
  return projectQueries.findProjectById(projectId);
}

export async function getStudentProjects(userId: string, filters: Record<string, unknown>) {
  const student = await prisma.student.findUnique({ where: { userId } });
  if (!student) throw new NotFoundError("Student");
  return projectQueries.findProjectsByStudent(
    student.id,
    filters as Parameters<typeof projectQueries.findProjectsByStudent>[1]
  );
}

export async function getTeacherProjects(teacherId: string, filters: Record<string, unknown>) {
  return projectQueries.findProjectsByTeacher(
    teacherId,
    filters as Parameters<typeof projectQueries.findProjectsByTeacher>[1]
  );
}

export async function getAllProjects(
  filters: Record<string, unknown>,
  pagination: { page: number; limit: number }
) {
  return projectQueries.findAllProjects(
    filters as Parameters<typeof projectQueries.findAllProjects>[0],
    pagination
  );
}
