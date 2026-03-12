import { z } from "zod";

export const submitProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  courseId: z.string().cuid(),
  fileUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
});

export const reviewProjectSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "REVISION_REQUESTED"]),
  teacherFeedback: z.string().min(20),
  grade: z.number().min(0).max(100).optional(),
});

export const projectFiltersSchema = z.object({
  studentId: z.string().optional(),
  courseId: z.string().optional(),
  status: z.string().optional(),
  teacherId: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
