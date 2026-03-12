import prisma from "@/lib/prisma";
import { NotFoundError, ForbiddenError } from "@/lib/errors";
import * as studentQueries from "./queries";

export async function getStudentProfile(studentId: string) {
  const s = await studentQueries.findStudentById(studentId);
  if (!s) throw new NotFoundError("Student");
  return s;
}

export async function getStudentDashboard(userId: string) {
  const s = await studentQueries.findStudentByUserId(userId);
  if (!s) throw new NotFoundError("Student");
  const data = await studentQueries.getStudentDashboardData(s.id);
  if (!data) throw new NotFoundError("Student");
  return {
    profile: data.student,
    recentScores: data.student.scores,
    recentProjects: data.student.projects,
    recentPayments: data.student.payments,
    notifications: data.notifications,
  };
}

export async function updateStudentProfile(
  userId: string,
  input: { program?: string; intakeYear?: number; enrollmentStatus?: string }
) {
  const s = await studentQueries.findStudentByUserId(userId);
  if (!s) throw new NotFoundError("Student");
  return studentQueries.updateStudent(s.id, input);
}

export async function updateStudent(
  studentId: string,
  input: { program?: string; intakeYear?: number; enrollmentStatus?: string }
) {
  const s = await studentQueries.findStudentById(studentId);
  if (!s) throw new NotFoundError("Student");
  return studentQueries.updateStudent(studentId, input);
}

export async function getStudentGPA(studentId: string) {
  return studentQueries.getStudentGPA(studentId);
}

export async function listStudents(filters: Record<string, unknown>, pagination: { page: number; limit: number }) {
  return studentQueries.findAllStudents(filters as Parameters<typeof studentQueries.findAllStudents>[0], pagination);
}

export async function getStudentFullRecord(studentId: string) {
  const s = await studentQueries.findStudentById(studentId);
  if (!s) throw new NotFoundError("Student");
  const [scores, projects, payments] = await Promise.all([
    prisma.score.findMany({ where: { studentId }, include: { course: true } }),
    prisma.project.findMany({ where: { studentId }, include: { course: true } }),
    prisma.payment.findMany({ where: { studentId } }),
  ]);
  return { ...s, scores, projects, payments };
}

export async function ensureStudentAccess(
  session: { userId: string; role: string },
  studentId: string
) {
  if (["MANAGEMENT", "TEACHER"].includes(session.role)) return;
  const student = await studentQueries.findStudentById(studentId);
  if (!student) throw new NotFoundError("Student");
  if (student.userId !== session.userId) throw new ForbiddenError();
}
