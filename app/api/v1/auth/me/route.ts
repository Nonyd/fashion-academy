import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import * as usersService from "@/modules/users/service";

async function handler(
  _req: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  const profile = await usersService.getUserProfile(session.userId);
  return successResponse(profile, "Profile retrieved");
}

export const GET = withAuth(handler, "STUDENT", "TEACHER", "MANAGEMENT");
