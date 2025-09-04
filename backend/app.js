import express from "express";
import path from "path";
import authRouter from "./routes/auth.route.js"
import connect from "./db/dbConnect.js";
import dotenv from "dotenv"
import passport from "passport";
import initpassport from "./config/passport.js";
import session from "express-session";
import resumeRoute from "./routes/resume.route.js"
dotenv.config();





const app =  express();

app.use(express.json());


const PORT  =  process.env.PORT || 5000
app.use(express.json());
app.use(express.urlencoded({extended:true}))


const URL = process.env.MONGO_URL || null




app.use(
    session({
        secret:process.env.SESSION_SECRET ,
        resave:false,
       saveUninitialized: false,
       cookie: { httpOnly: true },

    })
)

initpassport(passport);

app.use(passport.initialize());
app.use(passport.session())



app.use("/api/auth",authRouter);
app.use("/api/resume/",resumeRoute)




app.listen(PORT,()=>{
    connect(URL);
    console.log(`app is runing on port ${PORT}`);
})