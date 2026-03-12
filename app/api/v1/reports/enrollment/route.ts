import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as reportsService from "@/modules/reports/service";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const result = await reportsService.generateEnrollmentReport();
    return successResponse(result, "Enrollment report");
  } catch (e) {
    return handleApiError(e, "reports/enrollment");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
