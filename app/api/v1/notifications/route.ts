import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateQuery } from "@/lib/validators";
import { paginationSchema } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as mailService from "@/modules/mail/service";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const url = new URL(_req.url);
    const pagination = validateQuery(paginationSchema, url.searchParams);
    const { items, total } = await mailService.getNotifications(session.userId, pagination);
    return successResponse(
      { items, total },
      "Notifications retrieved"
    );
  } catch (e) {
    return handleApiError(e, "notifications");
  }
}

export const GET = withAuth(handler, "STUDENT", "TEACHER", "MANAGEMENT");
