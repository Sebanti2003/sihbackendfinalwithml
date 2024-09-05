import express from "express";
import { uploadimage } from "../controllers/imageuploadresp.controller.js";
import { uploadphoto } from "../utils/multer.js";
import { uploadphotomidd } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.route("/").post(uploadphoto,uploadphotomidd,uploadimage)

export default router;
