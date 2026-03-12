import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as mailService from "@/modules/mail/service";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const result = await mailService.getAllTemplates();
    return successResponse(result, "Templates retrieved");
  } catch (e) {
    return handleApiError(e, "mail/templates");
  }
}

export const GET = withAuth(handler, "MANAGEMENT");
