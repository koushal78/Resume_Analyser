import user from "../model/user.js";

import bcrypt from "bcryptjs";

export const signUp = async(req,res)=>{
    try {
        const {email,password,userName} = req.body;

        if(!email || !password || !userName){
            return res.status(400).json({success:false,message:"Fill all the feilds"});

        }





        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

       
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

      
        if (userName.length < 3 || userName.length > 20) {
            return res.status(400).json({
                success: false,
                message: "Username must be between 3 and 20 characters"
            });
        }


        const alreadyUserName = await user.findOne({userName});
        if(alreadyUserName) return res.status(400).json({success:false,message:"userName already exist try another"});
        
        const alreadyEmail = await user.findOne({email});
        if(alreadyEmail) return res.status(400).json({success:false,message:"Email already exist try another"});


        const hash =  await bcrypt.hash(password,10);
        const User  = await user.create({email,password:hash,userName});


        req.login(User,(err)=>{
            if(err) return res.status(500).json({message:"Login after signup failes"})
            
                 const safeUser = {id:User._id,email:User.email,userName:User.userName};
                 return res.status(201).json({success:true,message:"Register succesfully ",safeUser})
            })

       
        
    } catch (error) {
        return res.status(500).json({success:false,message:"problem in the signUp constroller"})
        
    }

}

export const login = async(req,res)=>{
   
    const user = req.user;
  res.json({ message: "Logged in", user: { id: user.id, email: user.email, userName: user.userName } });
   

}



export const logout = (req,res)=>{
    req.logout((err)=>{
        if(err) return res.status(500).json({message:"logout failed"});
        res.json({success:true,message:"logged out"})
    })


}

export const getMe = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  res.json({ user: req.user });
};


export const forget = async(req,res)=>{
   try {
     const{email,newPassword} = req.body
 
     const existingUser =  await user.findOne({email});
 if(!existingUser) return res.status(401).json({success:false,message:"Email not found"});

  const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    existingUser.password =  hashedPassword;

    await existingUser.save();

    return res.status(200).json({success:true,message:"password chnage is successfully"});

   } catch (error) {
    console.log("error in the forget password controller",error);
    res.status(500).json({success:false,message:"failed to change the password"})
    
   }
    

}

// in every request broweser send a user id with the request 