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
    const program = url.searchParams.get("program") ?? undefined;
    const semester = url.searchParams.get("semester");
    const data = await reportsService.generateAcademicReport({
      program,
      semester: semester ? Number(semester) : undefined,
    });
    return successResponse(data, "Academic report");
  } catch (e) {
    return handleApiError(e, "reports/academic");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
