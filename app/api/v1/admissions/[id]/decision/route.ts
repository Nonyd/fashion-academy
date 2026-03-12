import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as admissionsService from "@/modules/admissions/service";
import { admissionDecisionSchema } from "@/modules/admissions/schema";

async function handler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const body = await request.json();
    const input = validateBody(admissionDecisionSchema, body);
    const result = await admissionsService.processDecision(id, input, session.userId);
    return successResponse(result, "Decision processed");
  } catch (e) {
    return handleApiError(e, "admissions/[id]/decision");
  }
}

export const PATCH = withAuth(handler, "MANAGEMENT");
