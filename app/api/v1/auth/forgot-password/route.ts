import { NextRequest } from "next/server";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import { forgotPasswordSchema } from "@/modules/auth/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    validateBody(forgotPasswordSchema, body);
    return successResponse(
      { message: "If an account exists, you will receive a reset link." },
      "Check your email"
    );
  } catch (e) {
    return handleApiError(e, "auth/forgot-password");
  }
}
