import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { generateImage } from "../controllers/image.controller.js";

const router = Router();

router.route("/generate").post( verifyJWT, generateImage );

export default router