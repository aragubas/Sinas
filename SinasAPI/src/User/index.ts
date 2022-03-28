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

export async function getUsers(request: Request, response: Response) {
  const authenticationHeader = request.headers.authorization;

  if (!authenticationHeader) {
    response
      .status(400)
      .json(new ErrorResponse("invalid_username_or_password"));
    return;
  }

  let authHeader = Buffer.from(authenticationHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (authHeader[0].length <= 2 || authHeader[1].length <= 4) {
    response
      .status(400)
      .json(new ErrorResponse("invalid_username_or_password"));
    return;
  }

  const ceira = await prisma.user.findFirst({
    where: { username: authHeader[0] },
  });

  if (!ceira) {
    response.status(400).json(new ErrorResponse("user_not_found"));
    return;
  }

  console.log(ceira);

  await response.json(ceira);
}
