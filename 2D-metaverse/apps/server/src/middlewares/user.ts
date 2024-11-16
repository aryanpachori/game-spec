import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

 
  console.log(token);

  if (!token) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      role: string;
      userId: string;
    };
    //@ts-ignore
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
