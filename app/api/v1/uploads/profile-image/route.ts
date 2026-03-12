import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as uploadsService from "@/modules/uploads/service";
import prisma from "@/lib/prisma";

async function handler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || file.size > 5 * 1024 * 1024) {
      return handleApiError(new Error("File required, max 5MB"), "uploads/profile-image");
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadsService.uploadProfileImage(session.userId, {
      buffer,
      mimetype: file.type,
    });
    await prisma.user.update({
      where: { id: session.userId },
      data: { profileImage: url },
    });
    return successResponse({ url }, "Profile image updated");
  } catch (e) {
    return handleApiError(e, "uploads/profile-image");
  }
}

export const POST = withAuth(handler, "STUDENT", "TEACHER", "MANAGEMENT");
