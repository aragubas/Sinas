import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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
  const authenticationHeader = request.headers.authorization;

  if (!authenticationHeader) {
    response.status(400).json(new ErrorResponse("invalid_credentials"));
    return;
  }

  let authHeader = Buffer.from(authenticationHeader.split(" ")[1], "base64").toString().split(":");

  if (authHeader[0].length < 3 || authHeader[1].length < 4) {
    response.status(400).json(new ErrorResponse("invalid_credentials"));
    return;
  }

  console.log(authenticationHeader);

  const user = await prisma.user.findFirst({
    where: { username: authHeader[0] },
  });

  if (!user) {
    response.status(404).json(new ErrorResponse("user_not_found"));
    return;
  }

  if (user.password != authHeader[1]) {
    response.status(400).json(new ErrorResponse("invalid_password"));
    return;
  }

  await response.json(new SuccessResponse("user_found"));
}
