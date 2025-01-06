import { AppError } from "@/utils/app-error";
import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandling(
  error: any,
  _req: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: "Validation error", issues: error.format() });
  }

  return response.status(500).json({ message: error.message });
}
