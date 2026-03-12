import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as mailService from "@/modules/mail/service";
import { updateTemplateSchema } from "@/modules/mail/schema";

async function handler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const event = params?.event;
    if (!event) throw new Error("Missing event");
    const body = await request.json();
    const input = validateBody(updateTemplateSchema, body);
    const result = await mailService.updateTemplate(event, input);
    return successResponse(result, "Template updated");
  } catch (e) {
    return handleApiError(e, "mail/templates/[event]");
  }
}

export const PATCH = withAuth(handler, "MANAGEMENT");
