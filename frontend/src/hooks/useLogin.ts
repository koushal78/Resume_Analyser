import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useLogin = ()=>{

    const[loading,setLoading] =  useState(false)

    const{setUser} = useAuthContext()
    const navigate = useNavigate();


    const login = async ({email,password}:{email:string,password:string})=>{
      try {
        setLoading(true);
          const res =  await axios.post("https://resume-analyser-0hmh.onrender.com/api/auth/login",{email,password},{
              headers:{"Content-Type":"application/json"},
              withCredentials: true,
          })
          console.log(res)
          if(res.data.err){
            throw new Error(res.data.err)

          }
          setUser(res.data.user);
          toast.success("Login Successfull")
          navigate('/')
          
      } catch (error:any) {

        console.log("there is error in the login hook",error.message);
        toast.error(error.response?.data?.message || error.message)



        
      }
      finally{
        setLoading(false)
      }


    }
    return{loading,login}

}
export default useLogin;