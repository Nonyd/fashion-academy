import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as mailService from "@/modules/mail/service";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const count = await mailService.getUnreadCount(session.userId);
    return successResponse({ count }, "Unread count");
  } catch (e) {
    return handleApiError(e, "notifications/unread-count");
  }
}

export const GET = withAuth(handler, "STUDENT", "TEACHER", "MANAGEMENT");
