import { NextRequest } from "next/server";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as paymentsService from "@/modules/payments/service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") ?? "";
    await paymentsService.handleStripeWebhook(body, signature);
    return successResponse({ received: true }, "Webhook processed");
  } catch (e) {
    return handleApiError(e, "webhooks/stripe");
  }
}
