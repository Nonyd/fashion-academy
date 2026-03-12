import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as paymentsService from "@/modules/payments/service";

async function handler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const reference = params?.reference;
    if (!reference) throw new Error("Missing reference");
    const result = await paymentsService.verifyPaystack(reference);
    return successResponse(result, "Payment verified");
  } catch (e) {
    return handleApiError(e, "payments/verify");
  }
}

export const POST = withAuth(handler, "STUDENT", "TEACHER", "MANAGEMENT");
