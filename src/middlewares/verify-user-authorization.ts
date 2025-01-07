import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";

export function verifyUserAuthorization(role: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (!role.includes(request.user.role)) {
      throw new AppError("Forbidden", 403);
    }

    return next();
  };
}
