import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as admissionsService from "@/modules/admissions/service";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const data = await admissionsService.getAdmissionPipeline();
    return successResponse(data, "Pipeline stats");
  } catch (e) {
    return handleApiError(e, "admissions/stats");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
