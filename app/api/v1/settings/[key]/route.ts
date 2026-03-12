import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as settingsService from "@/modules/settings/service";

async function handler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const key = params?.key;
    if (!key) throw new Error("Missing key");
    const body = await request.json();
    const value = typeof body.value === "string" ? body.value : String(body.value);
    const result = await settingsService.updateSetting(key, value);
    return successResponse({ key, value: result }, "Setting updated");
  } catch (e) {
    return handleApiError(e, "settings/[key]");
  }
}

export const PATCH = withAuth(handler, "MANAGEMENT");
