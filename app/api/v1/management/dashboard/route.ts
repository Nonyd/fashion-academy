import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as managementService from "@/modules/management/service";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const data = await managementService.getManagementDashboard();
    return successResponse(data, "Dashboard retrieved");
  } catch (e) {
    return handleApiError(e, "management/dashboard");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
