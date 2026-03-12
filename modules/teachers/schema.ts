import { z } from "zod";

export const createTeacherSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  title: z.string().optional(),
  bio: z.string().optional(),
});

export const updateTeacherSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().optional(),
});

export const teacherFiltersSchema = z.object({
  search: z.string().optional(),
});
