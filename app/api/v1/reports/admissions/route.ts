import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as reportsService from "@/modules/reports/service";

async function handler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const url = new URL(request.url);
    const dateFrom = url.searchParams.get("dateFrom") ?? undefined;
    const dateTo = url.searchParams.get("dateTo") ?? undefined;
    const result = await reportsService.generateAdmissionsReport({ dateFrom, dateTo });
    return successResponse(result, "Admissions report");
  } catch (e) {
    return handleApiError(e, "reports/admissions");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
