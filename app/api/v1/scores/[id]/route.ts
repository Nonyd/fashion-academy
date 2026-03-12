import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody } from "@/lib/validators";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as scoresService from "@/modules/scores/service";
import { updateScoreSchema } from "@/modules/scores/schema";

async function getHandler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: { userId: string; role: string }
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const result = await scoresService.getScoreById(id, session);
    return successResponse(result, "Score retrieved");
  } catch (e) {
    return handleApiError(e, "scores/[id] GET");
  }
}

async function patchHandler(
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const teacher = await import("@/lib/prisma").then((p) =>
      p.default.teacher.findUnique({ where: { userId: session.userId } })
    );
    if (!teacher) throw new Error("Teacher not found");
    const body = await request.json();
    const input = validateBody(updateScoreSchema, body);
    const result = await scoresService.updateScore(id, input, teacher.id);
    return successResponse(result, "Score updated");
  } catch (e) {
    return handleApiError(e, "scores/[id] PATCH");
  }
}

async function deleteHandler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    await scoresService.deleteScore(id);
    return successResponse(null, "Score deleted");
  } catch (e) {
    return handleApiError(e, "scores/[id] DELETE");
  }
}

export const GET = withAuth(getHandler, "MANAGEMENT", "TEACHER", "STUDENT");
export const PATCH = withAuth(patchHandler, "TEACHER");
export const DELETE = withAuth(deleteHandler, "MANAGEMENT");
