import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { createUser, getUsers } from "./User";
import CORSMiddleware from "./CORSMiddleware";
import { createTropine } from "./Tropine";

dotenv.config();

const app: Express = express();
const prismaClient: PrismaClient = new PrismaClient();

app.use(CORSMiddleware);
app.use(express.json());

async function setUp() {
  await prismaClient.$connect();

  app.listen(3333, () => {
    console.log("Server running on port 3333");
  });
}

app.get("/user", getUsers);
app.post("/user", createUser);
app.post("/tropine", createTropine);

setUp();
