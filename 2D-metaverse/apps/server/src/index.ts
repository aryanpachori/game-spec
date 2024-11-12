import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import client from "@repo/db/client";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
const prisma = new client()
app.post("/",(req,res)=>{
  res.json({message:"hi"})
})

app.listen(3000, () => {
  console.log("server running on port 3000");
});
