import { app } from "@/app";
import { prisma } from "@/database/prisma";
import request from "supertest";

describe("SessionsController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({
      where: { id: user_id },
    });
  });

  it("should authenticate a and get access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "Auth Teste User",
      email: "auth_test_user@example.com",
      password: "password",
    });
    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post("/sessions").send({
      email: "auth_test_user@example.com",
      password: "password",
    });

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body).toHaveProperty("token");
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });
});
