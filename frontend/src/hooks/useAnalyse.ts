import axios from "axios"
import { useState } from "react";
import { useResumeContext } from "../context/resumeContext";
import toast from "react-hot-toast";


const useAnalyse = ()=>{
    const[loading,setLoading] = useState(false);
    const{setFeedback} = useResumeContext();
    const analyse = async(formData:FormData)=>{
        setLoading(true)
       try {
         const res = await axios.post("https://resume-prompt-backend.onrender.com/analyze",formData,{ withCredentials: false } ) ;
          console.log("form data ->",res.data.feedback.interface_Feedback);
          setFeedback(res.data.feedback.interface_Feedback);
          
          toast.success("Analyses suceessfully complete");

          
       } catch (error:any) {
        console.log("error in the drop resume hook",error.message);
        toast.error(error.response?.data?.message || error.message)
        
       }
       finally{
        setLoading(false);
       }

    }
    return {loading,analyse}

}


export default useAnalyse