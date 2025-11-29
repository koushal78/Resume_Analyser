import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";


const useforget = ()=>{
    const [loading,setLoading] =  useState(false);

    const forget = async({email,newPassword}:{email:string,newPassword:string})=>{
        setLoading(true)
      try {
          const res = await axios.post("http://localhost:8000/api/auth/forget_password",{email,newPassword},{
                headers:{"Content-Type":"application/json"},
              withCredentials:true
          })
          
  
          toast.success("password reset successfully")
          return res;
          
      } catch (error:any) {
        console.log("error in the forget password controller",error);
        toast.error(error.response?.data?.message || error.message);
        
      }
      finally{
        setLoading(false)
      }

    }

    return{forget,loading};
}

export default useforget
