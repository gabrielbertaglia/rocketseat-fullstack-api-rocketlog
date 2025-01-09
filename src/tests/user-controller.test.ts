import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";
import { EMAIL_EXISTS } from "@/utils/message-erros";

describe("UsersController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({
      where: { id: user_id },
    });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John Doe");

    user_id = response.body.id;
  });

  it("should throw an error if user with same email already exists", async () => {
    const response = await request(app).post("/users").send({
      name: "Duplicate Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(EMAIL_EXISTS);
  });

  it("should throw a validation error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "invalid-email",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });
});
