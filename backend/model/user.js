
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        require:true,

    }
})

const user = mongoose.model("User",userSchema)

export default user