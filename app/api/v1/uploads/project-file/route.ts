import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as uploadsService from "@/modules/uploads/service";

async function handler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) return handleApiError(new Error("File required"), "uploads/project-file");
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadsService.uploadProjectFile(session.userId, {
      buffer,
      mimetype: file.type,
      size: file.size,
    });
    return successResponse(result, "File uploaded");
  } catch (e) {
    return handleApiError(e, "uploads/project-file");
  }
}

export const POST = withAuth(handler, "STUDENT");
