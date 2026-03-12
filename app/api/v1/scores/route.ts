import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateBody, validateQuery } from "@/lib/validators";
import { paginationSchema } from "@/lib/validators";
import { successResponse, paginatedResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as scoresService from "@/modules/scores/service";
import { createScoreSchema } from "@/modules/scores/schema";
import { scoreFiltersSchema } from "@/modules/scores/schema";

async function postHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const body = await request.json();
    const input = validateBody(createScoreSchema, body);
    const teacher = await import("@/lib/prisma").then((p) =>
      p.default.teacher.findUnique({ where: { userId: session.userId } })
    );
    if (!teacher) throw new Error("Teacher not found");
    const score = await scoresService.publishScore(input, teacher.id);
    return successResponse(score, "Score published");
  } catch (e) {
    return handleApiError(e, "scores/POST");
  }
}

async function getHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const url = new URL(request.url);
    const pagination = validateQuery(paginationSchema, url.searchParams);
    const filters = validateQuery(scoreFiltersSchema, url.searchParams);
    const { items, total } = await import("@/modules/scores/queries").then((q) =>
      q.findAllScores(filters, pagination)
    );
    return paginatedResponse(items, {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit),
    });
  } catch (e) {
    return handleApiError(e, "scores/list");
  }
}

export const POST = withAuth(postHandler, "TEACHER");
export const GET = withAuth(getHandler, "MANAGEMENT");
