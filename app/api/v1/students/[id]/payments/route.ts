import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as paymentsService from "@/modules/payments/service";
import * as studentsService from "@/modules/students/service";

async function handler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: { userId: string; role: string }
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const student = await import("@/lib/prisma").then((p) =>
      p.default.student.findUnique({ where: { id } })
    );
    if (!student) throw new Error("Student not found");
    if (session.role === "STUDENT" && student.userId !== session.userId) {
      const { ForbiddenError } = await import("@/lib/errors");
      throw new ForbiddenError();
    }
    const url = new URL(request.url);
    const filters = Object.fromEntries(url.searchParams.entries());
    const result = await paymentsService.getPaymentHistory(id, filters);
    return successResponse(result, "Payments retrieved");
  } catch (e) {
    return handleApiError(e, "students/[id]/payments");
  }
}

export const GET = withAuth(handler, "MANAGEMENT", "STUDENT");
