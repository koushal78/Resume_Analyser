import express from "express";
import { forget, getMe, login, logout, signUp } from "../controller/auth.controoler.js";
import passport from "passport";

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',passport.authenticate('local'),  login);
router.post('/logout',logout)
router.get("/me", getMe);
router.post("/forget_password",forget)


export default router