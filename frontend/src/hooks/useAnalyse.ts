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
    const userId = user._id;
    
    const navigate = useNavigate()

    const analyse = async(formData:FormData)=>{
        setLoading(true)
       try {
         const res = await axios.post("https://resume-prompt-backend.onrender.com/analyze",formData,{ withCredentials: false } ) ;

       
         const feedback =  res.data.feedback.interface_Feedback;
         const imgType = res.data.preview_url
         console.log(res.data.preview_url)
         console.log(typeof imgType);
        
          
           setImageURL(res.data.preview_url);
           console.log(imageURL)
          
          setFeedback(res.data.feedback.interface_Feedback);
          await save({userId,feedback,resumePath:res.data.preview_url})
          
          toast.success("Analyses suceessfully complete");
          navigate('/Analyse', { state: { imageURL: res.data.preview_url } });

          
       } catch (error:any) {
        console.log("error in the drop resume hook",error.message);
        toast.error(error.response?.data?.message || error.message)
        
       }
       finally{
        setLoading(false);
       }

    }
    return {loading,analyse,imageURL}

}


export default useAnalyse