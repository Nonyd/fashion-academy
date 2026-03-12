import { NextRequest } from "next/server";
import { withAuth } from "@/lib/middleware";
import { validateQuery } from "@/lib/validators";
import { paginationSchema } from "@/lib/validators";
import { successResponse, paginatedResponse } from "@/lib/response";
import { handleApiError } from "@/lib/errors";
import * as projectsService from "@/modules/projects/service";
import * as uploadsService from "@/modules/uploads/service";
import { projectFiltersSchema } from "@/modules/projects/schema";

async function getHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  _session: unknown
) {
  try {
    const url = new URL(request.url);
    const pagination = validateQuery(paginationSchema, url.searchParams);
    const filters = validateQuery(projectFiltersSchema, url.searchParams);
    const { items, total } = await projectsService.getAllProjects(filters, pagination);
    const totalPages = Math.ceil(total / pagination.limit);
    return paginatedResponse(items, {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages,
    });
  } catch (e) {
    return handleApiError(e, "projects/list");
  }
}

async function postHandler(
  request: NextRequest,
  _ctx: { params?: Promise<Record<string, string>> },
  session: { userId: string }
) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) ?? undefined;
    const courseId = formData.get("courseId") as string;
    const file = formData.get("file") as File | null;
    const thumbnail = formData.get("thumbnail") as File | null;
    if (!title || !courseId || !file) {
      return handleApiError(new Error("Missing title, courseId, or file"), "projects/POST");
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadsService.uploadProjectFile(session.userId, {
      buffer,
      mimetype: file.type,
      size: file.size,
    });
    const thumbnailUrl = thumbnail
      ? (await uploadsService.uploadToCloudinary(
          { buffer: Buffer.from(await thumbnail.arrayBuffer()), mimetype: thumbnail.type },
          { folder: "projects" }
        )).url
      : undefined;
    const result = await projectsService.submitProject(
      {
        title,
        description,
        courseId,
        fileUrl: uploadResult.url,
        thumbnailUrl,
      },
      session.userId
    );
    return successResponse(result, "Project submitted");
  } catch (e) {
    return handleApiError(e, "projects/POST");
  }
}

export const GET = withAuth(getHandler, "MANAGEMENT");
export const POST = withAuth(postHandler, "STUDENT");
