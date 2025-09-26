import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const useLogout = ()=>{

    const [loading ,setLoading] = useState(false);
    const{setUser} = useAuthContext();

    const logout = async()=>{
        try {
            setLoading(true);
         const res =    await axios.post("https://resume-analyser-0hmh.onrender.com/api/auth/logout",{},{withCredentials:true})
            if(res.data.success){
                setUser(null);
            }
            toast.success("logout successfully");

        } catch (error:any) {
            console.log(error.message);
            toast.error(error.response?.data?.message || error.message)
        
        }
        finally{
            setLoading(false)
        }
    }
    return {loading,logout }
}

export default useLogout;


