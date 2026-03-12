import { NextRequest } from "next/server";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as uploadsService from "@/modules/uploads/service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || file.size > 10 * 1024 * 1024) {
      return handleApiError(new Error("File required, max 10MB"), "uploads/portfolio");
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadsService.uploadToCloudinary(
      { buffer, mimetype: file.type },
      { folder: "portfolios" }
    );
    return successResponse(result, "Portfolio uploaded");
  } catch (e) {
    return handleApiError(e, "uploads/portfolio");
  }
}
