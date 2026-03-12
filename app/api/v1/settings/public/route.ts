import { successResponse } from "@/lib/response";
import * as settingsService from "@/modules/settings/service";

export async function GET() {
  const settings = await settingsService.getPublicSettings();
  return successResponse(settings, "Public settings");
}
