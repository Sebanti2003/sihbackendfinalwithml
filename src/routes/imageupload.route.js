import express from "express";
import { deleteall, uploadimage } from "../controllers/imageuploadresp.controller.js";
import { uploadphoto } from "../utils/multer.js";
import { uploadphotomidd } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.route("/").post(uploadphoto,uploadphotomidd,uploadimage).delete(deleteall);

export default router;
