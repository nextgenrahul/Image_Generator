import { Router } from "express";
import { registerUser, loginUser, userCredits } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/credits").get(verifyJWT, userCredits);
router.route("/me").get(verifyJWT, (req, res) => {
    res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export default router;
