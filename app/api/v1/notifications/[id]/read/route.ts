import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as mailService from "@/modules/mail/service";

async function handler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    await mailService.markAsRead(id, session.userId);
    return successResponse(null, "Marked as read");
  } catch (e) {
    return handleApiError(e, "notifications/[id]/read");
  }
}

export const PATCH = withAuth(handler, "STUDENT", "TEACHER", "MANAGEMENT");
