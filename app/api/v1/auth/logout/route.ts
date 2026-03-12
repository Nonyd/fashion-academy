import { successResponse } from "@/lib/response";

export async function POST() {
  return successResponse({}, "Logged out");
}
