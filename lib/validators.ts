import { z } from "zod";
import { ValidationError } from "./errors";

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const searchSchema = z.object({
  q: z.string().optional(),
});

export const idParamSchema = z.object({
  id: z.string().cuid(),
});

export const dateRangeSchema = z.object({
  from: z.string().datetime().optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  to: z.string().datetime().optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
export type DateRangeInput = z.infer<typeof dateRangeSchema>;

export function validateBody<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.flatten().fieldErrors as Record<string, string[]>;
    const fields: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(issues)) {
      fields[k] = Array.isArray(v) ? v : [String(v)];
    }
    throw new ValidationError("Validation failed", fields);
  }
  return result.data;
}

export function validateQuery<T extends z.ZodType>(
  schema: T,
  searchParams: URLSearchParams
): z.infer<T> {
  const obj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return validateBody(schema, obj);
}
