import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import userRouter from "./routes/user";
import adminRouter from "./routes/user";
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/user", userRouter);
app.use("api/v1/admin",adminRouter)

app.listen(3000, () => {
  console.log("server running on port 3000");
});
