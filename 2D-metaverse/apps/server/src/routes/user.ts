import { Router } from "express";
import { signInTypes, signUpTypes } from "../types";
import PrismaClient from "@repo/db/client";
import jwt from "jsonwebtoken";
import { compare, hash } from "../scrypt";
import { configDotenv } from "dotenv";
configDotenv();
const router = Router();

const prisma = new PrismaClient();
router.post("/signup", async (req, res) => {
  const ParsedData = signUpTypes.safeParse(req.body);
  if (!ParsedData.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }
  const hashedPassword = await hash(ParsedData.data.password);
  try {
    const user = await prisma.user.create({
      data: {
        username: ParsedData.data.username,
        password: hashedPassword,
        role: ParsedData.data.type === "admin" ? "Admin" : "User",
      },
    });
    res.json(user);
    return;
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "User already exists" });
  }
});

router.post("/signin", async (req, res) => {
  const ParsedData = signInTypes.safeParse(req.body);
  if (!ParsedData.success) {
    res.status(400).json({ message: "Invalid inputs" });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: ParsedData.data.username,
      },
    });
    if (!user) {
      res.status(400).json({ message: "user doesn't exists" });
      return;
    }
    const isValid = await compare(ParsedData.data.password, user.password);
    if (!isValid) {
      res.status(400).json({ message: "incorrect password" });
      return;
    }
    const payload = {
      userId: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    res.json(token);
    return;
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "user not found" });
  }
});

export default router;
