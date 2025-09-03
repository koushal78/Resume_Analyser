import { Strategy as LocalStrategy  } from "passport-local";
import User from "../model/user.js";
import bcrypt from "bcryptjs"
import passport from "passport";


const initpassport =()=>{
    passport.use(
        new LocalStrategy({usernameField:"email"},async(email,password,done)=>{
            try {
                const user = await User.findOne({email})
                if(!user) return done(null,false,{message:"no user found with this email"})
                 
                const match  = await bcrypt.compare(password,user.password);
                if(!match) return done(null,false,{message:"Incorrect password"})

                return done(null,user);
                
            } catch (error) {
                console.error("Passport LocalStrategy error:", error);
                
                return done(error, false);
                
            }

        })
    )

  
    passport.serializeUser((user,done)=>done(null,user._id || user.id));
    passport.deserializeUser(async(id,done)=>{
        try {
            const user =  await User.findById(id).select("-password");
            done(null,user);
        } catch (error) {
            done(null,false,{message:"there is a problem in the deserializer"})
        }
    })

}

export default initpassport;