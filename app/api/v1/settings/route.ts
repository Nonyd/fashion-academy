import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as settingsService from "@/modules/settings/service";
import { z } from "zod";

const updateMultipleSchema = z.object({
  settings: z.array(z.object({ key: z.string(), value: z.string() })),
});

async function getHandler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const result = await settingsService.getAllSettings();
    return successResponse(result, "Settings retrieved");
  } catch (e) {
    return handleApiError(e, "settings GET");
  }
}

async function patchHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const body = await request.json();
    const parsed = validateBody(updateMultipleSchema, body);
    await settingsService.updateMultipleSettings(parsed.settings);
    const result = await settingsService.getAllSettings();
    return successResponse(result, "Settings updated");
  } catch (e) {
    return handleApiError(e, "settings PATCH");
  }
}

export const GET = withAuth(getHandler, "MANAGEMENT");
export const PATCH = withAuth(patchHandler, "MANAGEMENT");
