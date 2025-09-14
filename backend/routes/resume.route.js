import express from "express"
import {  deleteFeedback, getAllFeedback, getFeedbackById, saveFeedback } from "../controller/resume.controller.js";
import upload from "../middlewares/multerMemory.js";

const route =  express.Router();


route.post("/savefeedback",saveFeedback);
route.get('/feedbacks/:userId',getAllFeedback)
route.get('/feedback/:id',getFeedbackById)
route.delete('/deletefeedback/:id',deleteFeedback)



export default route;
