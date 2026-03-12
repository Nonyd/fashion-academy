import prisma from "@/lib/prisma";
import { NotFoundError, ForbiddenError } from "@/lib/errors";
import * as mailService from "@/modules/mail/service";
import * as scoreQueries from "./queries";

export async function publishScore(
  input: { studentId: string; courseId: string; score: number; assessmentType: string; semester: number; feedback?: string },
  teacherId: string
) {
  const course = await prisma.course.findFirst({
    where: { id: input.courseId, teacherId },
  });
  if (!course) throw new ForbiddenError("You do not teach this course");
  const score = await scoreQueries.createScore(input);
  const student = await prisma.student.findUnique({ where: { id: input.studentId }, include: { user: true } });
  if (student)
    await mailService.triggerAutoMail("SCORE_PUBLISHED", student.userId, {
      courseName: course.title,
      score: String(input.score),
      grade: score.letterGrade,
    });
  return score;
}

export async function updateScore(
  scoreId: string,
  input: { score?: number; feedback?: string },
  teacherId: string
) {
  const score = await scoreQueries.findScoreById(scoreId);
  if (!score) throw new NotFoundError("Score");
  const course = await prisma.course.findFirst({
    where: { id: score.courseId, teacherId },
  });
  if (!course) throw new ForbiddenError("You do not own this score");
  return scoreQueries.updateScore(scoreId, input);
}

export async function getStudentScores(studentId: string, filters: Record<string, unknown>) {
  return scoreQueries.findScoresByStudent(
    studentId,
    filters as Parameters<typeof scoreQueries.findScoresByStudent>[1]
  );
}

export async function getStudentGPA(studentId: string) {
  return scoreQueries.getStudentGPA(studentId);
}

export async function getCourseScores(courseId: string, teacherId: string) {
  const course = await prisma.course.findFirst({
    where: { id: courseId, teacherId },
  });
  if (!course) throw new ForbiddenError("You do not teach this course");
  return scoreQueries.findScoresByCourse(courseId, {});
}

export async function generateTranscript(studentId: string) {
  const scores = await scoreQueries.findScoresByStudent(studentId, {});
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { user: true },
  });
  if (!student) throw new NotFoundError("Student");
  return { student, scores };
}

export async function getScoreById(
  scoreId: string,
  session: { userId: string; role: string }
) {
  const score = await scoreQueries.findScoreById(scoreId);
  if (!score) throw new NotFoundError("Score");
  if (session.role === "STUDENT" && score.student.userId !== session.userId)
    throw new ForbiddenError();
  return score;
}

export async function deleteScore(scoreId: string) {
  const score = await scoreQueries.findScoreById(scoreId);
  if (!score) throw new NotFoundError("Score");
  return scoreQueries.deleteScore(scoreId);
}
