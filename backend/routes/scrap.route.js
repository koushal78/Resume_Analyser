import  express from "express";

const route = express.Router();

route.get("/",(req,res)=>{
    res.send("scraping is working fine")
})


export default route