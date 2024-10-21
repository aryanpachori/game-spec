import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export function middleware(req: Request, res: Response, next: NextFunction) {
  
  const authHeader = req.headers["authorization"] ?? "";
  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET!);
    //@ts-ignore
    if (decoded.userId) {
      //@ts-ignore
      req.userId = decoded.userId;
      return next();
    }
  } catch (e) {
    console.log(e);
  }
}
