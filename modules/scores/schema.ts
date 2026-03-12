import { z } from "zod";

export const createScoreSchema = z.object({
  studentId: z.string().cuid(),
  courseId: z.string().cuid(),
  score: z.number().min(0).max(100),
  assessmentType: z.string().min(1),
  semester: z.number().int(),
  feedback: z.string().optional(),
});

export const updateScoreSchema = z.object({
  score: z.number().min(0).max(100).optional(),
  feedback: z.string().optional(),
});

export const scoreFiltersSchema = z.object({
  studentId: z.string().optional(),
  courseId: z.string().optional(),
  teacherId: z.string().optional(),
  semester: z.coerce.number().optional(),
  assessmentType: z.string().optional(),
  minScore: z.coerce.number().optional(),
  maxScore: z.coerce.number().optional(),
});
