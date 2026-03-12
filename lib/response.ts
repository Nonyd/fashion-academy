import { NextResponse } from "next/server";

export type ApiMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: ApiMeta;
};

export function successResponse<T>(
  data: T,
  message = "Success",
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    { success: true, message, data },
    { status }
  );
}

export function errorResponse(
  message: string,
  status = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, message, error: message },
    { status }
  );
}

export function validationErrorResponse(
  errors: Record<string, string[]>,
  status = 422
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message: "Validation failed",
      errors,
    },
    { status }
  );
}

export function notFoundResponse(
  resource: string
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message: `${resource} not found`,
      error: "NOT_FOUND",
    },
    { status: 404 }
  );
}

export function unauthorizedResponse(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized",
      error: "UNAUTHORIZED",
    },
    { status: 401 }
  );
}

export function forbiddenResponse(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message: "Forbidden",
      error: "FORBIDDEN",
    },
    { status: 403 }
  );
}

export function paginatedResponse<T>(
  data: T[],
  meta: ApiMeta,
  message = "Records retrieved successfully"
): NextResponse<ApiResponse<T[]>> {
  return NextResponse.json({
    success: true,
    message,
    data,
    meta,
  });
}
