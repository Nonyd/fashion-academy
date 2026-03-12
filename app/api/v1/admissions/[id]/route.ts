import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as admissionsService from "@/modules/admissions/service";

async function handler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const result = await admissionsService.getAdmissionDetail(id);
    return successResponse(result, "Admission retrieved");
  } catch (e) {
    return handleApiError(e, "admissions/[id]");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
