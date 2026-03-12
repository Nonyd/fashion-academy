import { z } from "zod";

export const createAdmissionSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  country: z.string().min(1),
  program: z.string().min(1),
  intakeYear: z.number().int(),
  previousEducation: z.string().optional(),
  portfolioUrl: z.string().url().optional(),
  statementOfPurpose: z.string().min(100),
});

export const admissionDecisionSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED", "WAITLISTED"]),
  reviewNotes: z.string().optional(),
});

export const admissionFiltersSchema = z.object({
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  program: z.string().optional(),
  intakeYear: z.coerce.number().optional(),
  search: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
