import { z } from "zod";

export const initializePaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default("NGN"),
  purpose: z.string().min(1),
  admissionId: z.string().optional(),
  studentId: z.string().optional(),
  email: z.string().email(),
  name: z.string().min(1),
});

export const paymentFiltersSchema = z.object({
  studentId: z.string().optional(),
  admissionId: z.string().optional(),
  purpose: z.string().optional(),
  status: z.string().optional(),
  provider: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
