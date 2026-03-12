import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { successResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as userQueries from "@/modules/users/queries";
import * as usersService from "@/modules/users/service";

async function handler(
  _req: NextRequest,
  context: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const params = await context.params;
    const id = params?.id;
    if (!id) throw new Error("Missing id");
    const user = await userQueries.findUserById(id);
    if (!user) throw new Error("User not found");
    if (user.isActive) {
      await usersService.deactivateUser(id);
      return successResponse({ isActive: false }, "User deactivated");
    } else {
      await usersService.reactivateUser(id);
      return successResponse({ isActive: true }, "User reactivated");
    }
  } catch (e) {
    return handleApiError(e, "management/users/toggle-status");
  }
}

export const PATCH = withAuth(handler, "MANAGEMENT");
