import axios from "axios"
import { useState } from "react";
import { useResumeContext } from "../context/resumeContext";
import toast from "react-hot-toast";
import useSaveFeedback from "./useSaveFeedback";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";


const useAnalyse = ()=>{
    const[loading,setLoading] = useState(false);
    const{setFeedback} = useResumeContext();
     const [imageURL, setImageURL] = useState<string>(""); 
    const{save} = useSaveFeedback()
    const {user} = useAuthContext()
    const userId = user._id || user.id;
   
    const navigate = useNavigate()
    console.log("this is the user id 1->",userId)
    
    const analyse = async(formData:FormData)=>{
       try {
          setLoading(true)
         const res = await axios.post("https://resume-prompt-backend.onrender.com/analyze",formData,{ withCredentials: false } ) ;
         
       
         const feedback =  res.data.feedback.interface_Feedback;
         const resumePath = res.data.preview_url
        
        
         
         setImageURL(resumePath);
       
           setFeedback(res.data.feedback.interface_Feedback);
           
           

          await save({userId,feedback,resumePath})

          
          toast.success("Analyses suceessfully complete");
          navigate('/Analyse', { state: { imageURL: res.data.preview_url } });

          
       } catch (error:any) {
        console.log("error in the  useAnalyse hook",error.message);
        toast.error(error.response?.data?.message || error.message)
        
       }
       finally{
        setLoading(false);
       }

    }
    return {loading,analyse,imageURL}

}


export default useAnalyse