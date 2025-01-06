import { AppError } from "@/utils/app-error";
import { Response, Request, NextFunction } from "express";

export function errorHandling(
  error: any,
  _req: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: error.message });
}
