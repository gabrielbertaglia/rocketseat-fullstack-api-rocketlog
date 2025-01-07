import { Request, Response } from "express";

export class SessionsController {
  create(request: Request, response: Response) {
    return response.json({ message: "ok" });
  }
}
