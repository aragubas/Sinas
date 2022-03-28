import express, { Express, NextFunction, Request, Response } from "express";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.header("Access-Control-Allow-Origin", "http://localhost:3000");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  await next();
}
