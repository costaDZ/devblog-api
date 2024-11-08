import express from "express";
import {login, signup, verifyEmail, logout} from "../controllers";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);

export default router;
