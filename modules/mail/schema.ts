import { z } from "zod";

export const sendManualMailSchema = z.object({
  recipients: z.union([
    z.literal("all"),
    z.literal("students"),
    z.literal("teachers"),
    z.array(z.string().email()),
  ]),
  subject: z.string().min(1),
  body: z.string().min(1),
});

export const updateTemplateSchema = z.object({
  subject: z.string().optional(),
  bodyHtml: z.string().optional(),
  isActive: z.boolean().optional(),
});
