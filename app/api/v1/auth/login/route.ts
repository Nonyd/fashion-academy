import { NextRequest } from "next/server";
import { validateBody } from "@/lib/validators";
import { handleApiError } from "@/lib/errors";
import { successResponse, errorResponse } from "@/lib/response";
import * as authService from "@/modules/auth/service";
import { loginSchema } from "@/modules/auth/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = validateBody(loginSchema, body);
    const result = await authService.login(input);
    return successResponse(result, "Login successful");
  } catch (e) {
    return handleApiError(e, "auth/login");
  }
}
