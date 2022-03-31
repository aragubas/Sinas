import express, { Express, Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import AuthUser from "../Models/AuthUser";
import Authentication from "../Authentication";

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

class GetTropineResponse {}

interface CreateTropineRequest {
  content: string;
  followers_only: boolean;
}

interface GetTropineRequest {
  tropineID: string;
}

const prisma = new PrismaClient();

export async function createTropine(request: Request, response: Response) {
  const user = await Authentication(request, response);
  if (!user) {
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
