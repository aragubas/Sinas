import express, { Express, NextFunction, Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import AuthUser from "../Models/AuthUser";

const prisma = new PrismaClient();

class ErrorResponse {
  status = "error";
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export default async function (request: Request, response: Response): Promise<AuthUser | undefined> {
  const authenticationHeader = request.headers.authorization;

  // Check if authentication header is present
  if (!authenticationHeader) {
    response.status(400).json(new ErrorResponse("invalid_credentials"));
    return;
  }

  let authHeader = Buffer.from(authenticationHeader.split(" ")[1], "base64").toString().split(":");

  if (authHeader[0].length < 3 || authHeader[1].length < 4) {
    response.status(400).json(new ErrorResponse("invalid_credentials"));
    return;
  }

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

  return new AuthUser(user);
}
