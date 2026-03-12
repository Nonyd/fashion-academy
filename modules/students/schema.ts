import { z } from "zod";

export const updateStudentSchema = z.object({
  program: z.string().optional(),
  intakeYear: z.number().int().optional(),
  enrollmentStatus: z.enum(["ACTIVE", "GRADUATED", "WITHDRAWN", "SUSPENDED"]).optional(),
});

export const studentFiltersSchema = z.object({
  program: z.string().optional(),
  intakeYear: z.coerce.number().optional(),
  enrollmentStatus: z.string().optional(),
  search: z.string().optional(),
});
