import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization || "";
  console.log(authHeader);
  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET!);
    //@ts-ignore
    if (decoded.userId) {
      // @ts-ignore
      if (decoded.role !== "admin") {
        res.status(403).json({ message: "unauthorized" });
        return;
      }
      console.log(decoded);
      //@ts-ignore
      req.userId = decoded.userId;
      next();
      
    }
    return res.status(401).json({ messaage: "error getting userId" });
  } catch (e) {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
}
