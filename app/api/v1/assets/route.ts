import { successResponse } from "@/lib/response";
import * as assetsService from "@/modules/assets/service";

export async function GET() {
  const assets = await assetsService.getAllAssets();
  return successResponse(assets, "Assets retrieved");
}
