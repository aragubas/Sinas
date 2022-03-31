import express, { Express, Request, Response } from "express";
import { PrismaClient, Tropine, User } from "@prisma/client";
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

class GetTropineResponse {
  tropineID: string;
  tropineContent: string;
  author: AuthUser | null;

  constructor(tropine: Tropine, author: AuthUser | null) {
    this.tropineID = tropine.id;
    this.tropineContent = tropine.content;
    this.author = author;
  }
}

interface CreateTropineRequest {
  content: string;
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
        authorId: user.id,
      },
    });

    // Return tropine
    response.status(200).send(new SuccessResponse(tropine.id));
  } catch {
    response.status(400).send(new ErrorResponse("invalid_parameters"));
  }
}

export async function getTropine(request: Request, response: Response) {
  // Get the request body
  const body = request.body as GetTropineRequest;

  // Check if the request body is valid
  if (!body.tropineID) {
    response.status(400).send(new ErrorResponse("missing_parameters"));
    return;
  }

  const tropine = await prisma.tropine.findUnique({
    where: { id: body.tropineID },
  });

  // Check if tropine exists
  if (!tropine) {
    response.status(404).send(new ErrorResponse("tropine_not_found"));
    return;
  }

  // Return tropine
  const author = await prisma.user.findUnique({
    where: { id: tropine.authorId },
  });
  let authUser: AuthUser | null = null;

  if (author) {
    authUser = new AuthUser(author);
  }

  response.status(200).send(new GetTropineResponse(tropine, authUser));
}
