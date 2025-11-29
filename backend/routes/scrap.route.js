import  express from "express";
import { getDetails, health } from "../controller/scrap.controller.js";

const route = express.Router();

route.post("/getDetails",getDetails);
route.get("/health",health);

export default route