import { useState } from "react"
import useSignup from "../../hooks/useSignup";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


const SignUp = () => {

const [input, setInput] = useState({
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
});

const{loading,signup} = useSignup();
const navigate = useNavigate();

const handleSumbit = async(e:any)=>{
    e.preventDefault();
    if(input.password !== input.confirmPassword){
        toast.error("Password not match");
        return;
    }
   await signup({
    email:input.email,
    password:input.password,
    userName:input.userName,
   });

   navigate("/")


    console.log(input);


}

  return (
    <div className="min-h-[calc(100vh-182px)]  flex justify-center items-center py-8 ">
        <div className="text-white w-full p-8 rounded-md bg-[rgb(17,27,45)] shadow-2xl hover:shadow-blue-700 duration-300 max-w-[500px]  ">
            <div className="w-full grid place-items-center">
                <div className="p-6 bg-blue-500 rounded-full w-fit   "><User className=""/></div> 
                <p className="font-semibold text-gray-400">Create Your Account</p>
               
                
                </div>
            <form onSubmit={handleSumbit} className="  flex flex-col gap-4 items-center">
                <div className="flex flex-col gap-2 w-full " >
                    <label htmlFor="email" className="text-lg font-semibold" >Email</label>
                    <input type="email" name="email" placeholder="Enter you email"
                    className="border-1 px-2 py-2 rounded-md outline-none"
                    value={input.email}
                    onChange={(e)=>setInput({...input,email:e.target.value})}
                    
                    />
                </div>
                <div className="flex flex-col gap-2 w-full ">
                    <label htmlFor="Username" className="text-lg font-semibold" >Username</label>
                    <input type="Username" name="Username" placeholder="Enter you Username"
                    className="border-1 px-2 py-2 rounded-md w-full outline-none "
                    value={input.userName}
                    onChange={(e)=> setInput({...input,userName:e.target.value})}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full ">
                    <label htmlFor="password" className="text-lg font-semibold" >Password</label>
                    <input type="password" name="password" placeholder="Enter you password" 
                    className="border-1 px-2 py-2 rounded-md  outline-none"
                    value={input.password}
                    onChange={(e)=>(setInput({...input,password:e.target.value}))}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="Confirm password" className="text-lg font-semibold" >Confirm Password</label>
                    <input type="password" name="Confirm password" placeholder="Enter confirm password"
                    className="border-1 px-2 py-2 rounded-md outline-none"
                    value={input.confirmPassword}
                    onChange={(e)=>(setInput({...input,confirmPassword:e.target.value}))}
                    />
                </div>
                <button type="submit" className="border-2 bg-blue-600 rounded-md w-full py-1 cursor-pointer" >
                    {
                        loading ? <p>loading...</p>
                         : <p>
                             SignUp
                         </p>
                    }
                    </button>
                    <div className="flex gap-2">
                      <p>Already have an accound?</p><Link to={"/login"} className="text-blue-700 hover:border-b-2 border-blue-700 duration-200" >login</Link>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp