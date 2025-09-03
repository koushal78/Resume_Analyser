import express from "express";
import { getMe, login, logout, signUp } from "../controller/auth.controoler.js";
import passport from "passport";

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',passport.authenticate('local'),  login);
router.post('/logout',logout)
router.get("/me", getMe);


export default router