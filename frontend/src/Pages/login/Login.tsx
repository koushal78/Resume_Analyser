import { User } from "lucide-react"
import { useState } from "react"
import useLogin from "../../hooks/useLogin"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();

  const[input,setInput] = useState({
    email:"",
    password:""
  })

const{loading,login} = useLogin();
  const handleSubmit = async(e:any)=>{
    e.preventDefault();
    await login({email:input.email,password:input.password});

    navigate('/')


  }
  return (
    <div className="min-h-[calc(100vh-182px)]  flex justify-center items-center py-8 ">
        <div className="text-white w-full p-8 rounded-md bg-[rgb(17,27,45)] shadow-2xl hover:shadow-blue-700 duration-300 max-w-[500px]">
        <div className="w-full grid place-items-center">
                <div className="p-6 bg-blue-500 rounded-full w-fit   "><User className=""/></div> 
                <p className="font-semibold text-gray-400">Create Your Account</p>
               
                
                </div>
        <form action="" onSubmit={handleSubmit} className="  flex flex-col gap-4 items-center" >
          <div className="flex flex-col gap-2 w-full " >
                    <label htmlFor="email" className="text-lg font-semibold" >Email</label>
                    <input type="email" name="email" placeholder="Enter you email"
                    className="border-1 px-2 py-2 rounded-md outline-none"
                    value={input.email}
                    onChange={(e)=>setInput({...input,email:e.target.value})}
                    
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

                <button type="submit" className="border-2 bg-blue-600 rounded-md w-full py-1 cursor-pointer" >
                  {loading ? <p>loading</p>:<p>login</p>
                  }
                </button>

        </form>
      </div>
    </div>
  )
}

export default Login