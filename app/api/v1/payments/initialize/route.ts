import { NextRequest } from "next/server";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as paymentsService from "@/modules/payments/service";
import { initializePaymentSchema } from "@/modules/payments/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = validateBody(initializePaymentSchema, body);
    const result = await paymentsService.initializePaystack(input);
    return successResponse(result, "Payment initialized");
  } catch (e) {
    return handleApiError(e, "payments/initialize");
  }
}
