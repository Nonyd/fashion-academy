import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as mailService from "@/modules/mail/service";
import { sendManualMailSchema } from "@/modules/mail/schema";

async function handler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const body = await request.json();
    const input = validateBody(sendManualMailSchema, body);
    await mailService.sendBulkMail(input.recipients, input.subject, input.body);
    return successResponse({ sent: true }, "Mail sent");
  } catch (e) {
    return handleApiError(e, "mail/send");
  }
}

export const POST = withAuth(handler, "MANAGEMENT");
