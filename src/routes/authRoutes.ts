import express from "express";
import {login, signup, verifyEmail, logout, resendVerifyEmail, refreshToken} from "../controllers";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resent-verification-email", resendVerifyEmail);
router.post("/refrech-token", refreshToken);

export default router;
