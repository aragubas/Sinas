import express, { Express, Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import Authentication from "../Authentication";
import AuthUser from "../Models/AuthUser";

const prisma = new PrismaClient();

class ErrorResponse {
  status = "error";
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

class SuccessResponse {
  status = "success";
  user: AuthUser;
  constructor(user: User) {
    this.user = new AuthUser(user);
  }
}

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export async function createUser(request: Request, response: Response) {
  const body = request.body as CreateUserRequest;

  // Check if the request body is valid
  if (!body.username || !body.email || !body.password) {
    response.status(400).send(new ErrorResponse("missing_parameters"));
    return;
  }

  // Check if parameters are valid
  if (body.username.length < 3 || body.email.length < 5 || body.password.length < 3) {
    response.status(400).send(new ErrorResponse("invalid_parameters"));
    return;
  }

  // Check if the user already exists
  const userCheck = await prisma.user.findFirst({
    where: { username: body.username.toLowerCase(), email: body.email },
  });

  if (userCheck) {
    response.status(400).send(new ErrorResponse("user_already_exists"));
    return;
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      username: body.username.toLowerCase(),
      email: body.email,
      password: body.password,
    },
  });

  response.status(200).send(new SuccessResponse(user));
}

export async function getUsers(request: Request, response: Response) {
  const user = await Authentication(request, response);
  if (!user) {
    return;
  }

  await response.json({ status: "success", user: user });
}
