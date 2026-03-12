import { ConflictError, NotFoundError } from "@/lib/errors";
import * as courseQueries from "./queries";

export async function createCourse(input: {
  title: string;
  code: string;
  description?: string;
  program: string;
  semester: number;
  teacherId?: string;
}) {
  const existing = await courseQueries.findCourseByCode(input.code);
  if (existing) throw new ConflictError("Course code already exists");
  return courseQueries.createCourse(input);
}

export async function updateCourse(
  courseId: string,
  input: { title?: string; code?: string; description?: string; program?: string; semester?: number; teacherId?: string }
) {
  return courseQueries.updateCourse(courseId, input);
}

export async function archiveCourse(courseId: string) {
  return courseQueries.archiveCourse(courseId);
}

export async function enrollStudent(studentId: string, courseId: string) {
  return courseQueries.enrollStudent(studentId, courseId);
}

export async function unenrollStudent(studentId: string, courseId: string) {
  return courseQueries.unenrollStudent(studentId, courseId);
}

export async function listCourses(
  filters: Record<string, unknown>,
  pagination: { page: number; limit: number }
) {
  return courseQueries.findAllCourses(
    filters as Parameters<typeof courseQueries.findAllCourses>[0],
    pagination
  );
}

export async function getCourseDetail(courseId: string) {
  const c = await courseQueries.findCourseById(courseId);
  if (!c) throw new NotFoundError("Course");
  return c;
}
