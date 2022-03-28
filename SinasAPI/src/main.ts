import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { getUsers } from "./User";
import CORSMiddleware from "./CORSMiddleware";

dotenv.config();

const app: Express = express();
const prismaClient: PrismaClient = new PrismaClient();

app.use(express.json());
app.use(CORSMiddleware);

async function setUp() {
  await prismaClient.$connect();

  app.listen(3333, () => {
    console.log("Server running on port 3333");
  });
}

app.get("/user", getUsers);

setUp();
