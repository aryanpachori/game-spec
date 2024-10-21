import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./router/user";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/user", userRouter);

app.listen(3000, () => {
  console.log("server running on 3000");
});
