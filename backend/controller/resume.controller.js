
import ResumeFeedback from "../model/feedback.js";

export const saveFeedback = async (req, res) => {
  try {
    const { userId, feedback, resumePath } = req.body;

    if (!userId || !feedback || !resumePath) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    
    const count = await ResumeFeedback.countDocuments({ userId });
    if (count >= 6) {
      const oldest = await ResumeFeedback.findOne({ userId }).sort({ createdAt: 1 });
      if (oldest) {
        await ResumeFeedback.findByIdAndDelete(oldest._id);
      }
    }

    const newFeedback = await ResumeFeedback.create({
      userId,
      feedback,
      resumePath,
    });

    console.log("Feedback saved:", newFeedback);
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("saveFeedback error:", error); // ✅ fix log
    res.status(500).json({ error: error.message });
  }
};


export const getAllFeedback = async (req,res)=>{
  try {
    const{userId} = req.params;
    const feedback =  await ResumeFeedback.find({userId}).sort({createdAt:-1});
    if(feedback.length == 0)return res.status(200).json({message:"no feedback is available  "})
    res.json(feedback);
  } catch (error) {
    console.log("error in the getallfeedback",error.message)
    res.status(500).json({message:error.message});
    
  }
}

export const getFeedbackById = async (req,res)=>{
  try {
    const feedback = await ResumeFeedback.findById(req.params.id);
    if(!feedback)return res.status(404).json({message:"Feedback not found"})
      res.json(feedback)
  } catch (error) {
    console.log("error in the get one feedback controller",error.message);
    res.status(500).json({success:false,message:error.message})
    
  }
}


export const deleteFeedback = async(req,res)=>{
  try {
    const feedback = await ResumeFeedback.findByIdAndDelete(req.params.id);
    if(!feedback) return res.status(404).json({success:false,messgae:"no feedback found"});
    res.json({success:true,message:"feedback deleted successfully"})

    
  } catch (error) {
    console.log("error in the delete feedback controller ",error.message);
    res.status(500).json({success:false,message:error.message});
    
  }
}


