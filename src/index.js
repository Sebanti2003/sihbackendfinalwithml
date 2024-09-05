import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import imagerouter from "../src/routes/imageupload.route.js";
import { configDotenv } from "dotenv";
const app = express();
configDotenv();
connectDB();

app.use(express.json());

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use("/api/v1/images", imagerouter);
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
