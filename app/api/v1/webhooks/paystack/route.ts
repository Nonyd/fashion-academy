import { NextRequest } from "next/server";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as paymentsService from "@/modules/payments/service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get("x-paystack-signature") ?? "";
    await paymentsService.handlePaystackWebhook(body, signature);
    return successResponse({ received: true }, "Webhook processed");
  } catch (e) {
    return handleApiError(e, "webhooks/paystack");
  }
}
