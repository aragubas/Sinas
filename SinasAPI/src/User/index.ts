import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Authentication from "../Authentication";

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
  message: string;
  constructor(message: string) {
    this.message = message;
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

  const userCheck = await prisma.user.findFirst({
    where: { username: body.username, email: body.email },
  });

  // Check if user already exists
  if (userCheck) {
    response.status(400).send(new ErrorResponse("user_already_exists"));
    return;
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: body.password,
    },
  });

  response.status(200).send(new SuccessResponse("user_created_successfully"));
}

export async function getUsers(request: Request, response: Response) {
  const user = await Authentication(request, response);
  if (!user) {
    return;
  }

  await response.json(new SuccessResponse("user_found"));
}
