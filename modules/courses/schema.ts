import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional(),
  program: z.string().min(1),
  semester: z.number().int().min(1),
  teacherId: z.string().cuid().optional(),
});

export const updateCourseSchema = z.object({
  title: z.string().optional(),
  code: z.string().optional(),
  description: z.string().optional(),
  program: z.string().optional(),
  semester: z.number().optional(),
  teacherId: z.string().optional(),
});

export const enrollStudentSchema = z.object({
  studentId: z.string().cuid(),
  courseId: z.string().cuid(),
});
