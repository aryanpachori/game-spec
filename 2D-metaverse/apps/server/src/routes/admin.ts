import { Router } from "express";

const router = Router();
router.get("/test", (req, res) => {
  console.log("testing route");
});
export default router;
