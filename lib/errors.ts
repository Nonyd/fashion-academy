export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public fields: Record<string, string[]>
  ) {
    super(message, 422);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
    this.name = "ConflictError";
  }
}

export class PaymentError extends AppError {
  constructor(message: string) {
    super(message, 402);
    this.name = "PaymentError";
  }
}

import { log } from "./logger";
import {
  errorResponse,
  forbiddenResponse,
  notFoundResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "./response";
import type { NextResponse } from "next/server";

export function handleApiError(
  error: unknown,
  context?: string
): NextResponse {
  if (context) {
    log.error(
      context,
      error instanceof Error ? error : new Error(String(error)),
      { context }
    );
  }

  if (error instanceof UnauthorizedError) {
    return unauthorizedResponse();
  }
  if (error instanceof ForbiddenError) {
    return forbiddenResponse();
  }
  if (error instanceof NotFoundError) {
    return notFoundResponse(error.message.replace(" not found", ""));
  }
  if (error instanceof ValidationError) {
    return validationErrorResponse(error.fields);
  }
  if (error instanceof AppError) {
    return errorResponse(error.message, error.statusCode);
  }

  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred"
      : error instanceof Error
        ? error.message
        : String(error);
  return errorResponse(message, 500);
}
