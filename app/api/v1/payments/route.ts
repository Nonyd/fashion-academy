import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateQuery } from "@/lib/validators";
import { paginationSchema } from "@/lib/validators";
import { paginatedResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as paymentsService from "@/modules/payments/service";
import { paymentFiltersSchema } from "@/modules/payments/schema";

async function handler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const url = new URL(request.url);
    const pagination = validateQuery(paginationSchema, url.searchParams);
    const filters = validateQuery(paymentFiltersSchema, url.searchParams);
    const { items, total } = await paymentsService.findAllPayments(filters, pagination);
    const totalPages = Math.ceil(total / pagination.limit);
    return paginatedResponse(items, {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages,
    });
  } catch (e) {
    return handleApiError(e, "payments/list");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
