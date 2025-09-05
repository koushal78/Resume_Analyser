import axios from "axios";
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";



const useSignup = () => {


    const [loading, setLoading] = useState(false);
    
    const { setUser } = useAuthContext()

    const signup = async ({ email, password, userName }: { email: string; password: string; userName: string }) => {
        setLoading(true)
        try {
            const res = await axios.post("https://resume-analyser-0hmh.onrender.com/api/auth/signup", {
                email, password, userName
            }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })

            console.log(res)

            if (res.data.err) {
                throw new Error(res.data.err.message)
            }
            setUser(res.data);
            toast.success("Successfully Register")
        } catch (error: any) {
            console.log("error in the signup hook", error.message)
            toast.error(error.response?.data?.message || error.message);
        }
        finally {
            setLoading(false)
        }


    }


    return { loading, signup };


}

export default useSignup
