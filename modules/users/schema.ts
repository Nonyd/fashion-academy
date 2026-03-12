import { z } from "zod";

const roleEnum = z.enum(["STUDENT", "TEACHER", "MANAGEMENT"]);

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  role: roleEnum,
  program: z.string().optional(),
  intakeYear: z.number().int().min(2020).optional(),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  profileImage: z.string().url().optional(),
});
