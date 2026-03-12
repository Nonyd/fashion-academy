import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as paymentsService from "@/modules/payments/service";

async function handler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const student = await import("@/lib/prisma").then((p) =>
      p.default.student.findUnique({ where: { userId: session.userId } })
    );
    if (!student) throw new Error("Student not found");
    const url = new URL(request.url);
    const filters = Object.fromEntries(url.searchParams.entries());
    const result = await paymentsService.getPaymentHistory(student.id, filters);
    return successResponse(result, "Payment history retrieved");
  } catch (e) {
    return handleApiError(e, "payments/me");
  }
}

export const GET = withAuth(handler, "STUDENT");
