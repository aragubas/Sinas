import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class ErrorResponse {
  status = "error";
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

class SuccessResponse {
  status = "success";
  tropineID: string;
  constructor(message: string) {
    this.tropineID = message;
  }
}

interface CreateTropineRequest {
  content: string;
  followers_only: boolean;
}

const prisma = new PrismaClient();

export async function createTropine(request: Request, response: Response) {
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

  const user = await prisma.user.findFirst({
    where: { username: authHeader[0] },
  });

  if (user == null) {
    response.status(400).json(new ErrorResponse("invalid_credentials"));
    return;
  }

  // Get the request body
  const body = request.body as CreateTropineRequest;

  // Check if the request body is valid
  if (!body.content) {
    response.status(400).send(new ErrorResponse("missing_parameters"));
    return;
  }

  // Create tropine
  try {
    const tropine = await prisma.tropine.create({
      data: {
        content: body.content,
        followers_only: body.followers_only,
        authorId: user.id,
      },
    });

    // Return tropine
    response.status(200).send(new SuccessResponse(tropine.id));
  } catch {
    response.status(400).send(new ErrorResponse("invalid_parameters"));
  }
}
