import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
const router = Router();
const prisma = new PrismaClient();
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
      avatarUrl: `"https://api.dicebear.com/9.x/pixel-art/svg?seed=${username}"`,
    },
  });
  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET!
  );
  res.json({ token });
  console.log(token, user);
});

router.post("/rooms", middleware, async (req, res) => {
  // @ts-ignore
  const userid = req.userId;
  console.log(userid);
  const { dimensions } = req.body;
  const room = await prisma.room.create({
    data: {
      dimensions: dimensions,
      ownerId: userid,
    },
  });

  res.json(room.id);
});

router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user) {
    res.json({ username: user.username, avatarUrl: user.avatarUrl });
    return;
  }
  res.json({ message: "no user found" });
});

router.put("/:userId/avatar", middleware, async (req, res) => {
  // @ts-ignore
  const { userId } = req.params;
  const { avatarUrl } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatarUrl: avatarUrl,
      },
    });
  }
  res.json(avatarUrl);
  return;
});

export default router;
