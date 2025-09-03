import express from "express"
import { dropResume } from "../controller/resume.controller.js";
import upload from "../middlewares/multerMemory.js";

const route =  express.Router();


route.post("/drop_resume",upload.single("file") ,dropResume);


export default route;