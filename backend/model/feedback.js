
import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    feedback:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
    },
    resumePath:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const ResumeFeedback =  mongoose.model("ResumeFeedback",feedbackSchema)

export default ResumeFeedback