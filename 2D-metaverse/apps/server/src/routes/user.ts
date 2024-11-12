import { Router } from "express";

const router = Router();

router.get("/signin", (req, res) => {
  res.json({ message: "test" });
});

export default router;
