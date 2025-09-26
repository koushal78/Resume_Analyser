
import { IoReorderThreeSharp } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const{user} = useAuthContext();
    const [show,setShow] = useState(false)
  return (
    <div className="md:w-[70vw] w-full h-full">
        <div className=" text-white py-4  ">
            <div className="border-2 border-blue-800 shadow-2xl  shadow-blue-950 flex justify-between items-center text-blue-200 px-4  rounded-full py-2">
                <div><p className="font-semibold text-xl">Analyser</p></div>
                <div className="md:hidden">
                    <p className="text-3xl">
                        <IoReorderThreeSharp
                        onClick={()=>setShow(!show)}
                        />
                    </p>

                </div>



                <div className="hidden md:block">
                    {
                        user ? (
                            <div onClick={()=>setShow(!show)}>

                                <Logout />
                            </div>

                        ):
                    (<ul className="flex gap-2 ">
                        <li> <button className=" primary-btn  " ><Link to={'/signup'} onClick={()=>setShow(!show)}>Signup</Link></button> </li>
                        <li> <button className="primary-btn" ><Link to={'/login'} onClick={()=>setShow(!show)} >login</Link></button> </li>
                    </ul>)
                    }
                </div>




            </div>

        </div>
        <div 
        
        className={` h-[300px ] w-full  ${show ? "" : "hidden"} `}
        
        
        >

            {user ? (
                <ul onClick={()=>setShow(!show)}  className="w-full flex flex-col gap-4  bg-gray-400/15 rounded-md backdrop-blur-lg py-4 items-center shadow-2xl/50 shadow-blue-800  ">

                    <Logout/>

                </ul>
                
            
            ):(
           <ul className="w-full flex flex-col gap-4  bg-gray-400/15 rounded-md backdrop-blur-lg py-4 items-center shadow-2xl/50 shadow-blue-800  ">
           <li> <button className="  border-2 border-white rounded-full py-1 text-lg min-w-[100px] text-blue-400 font-semibold hover:bg-blue-600 hover:text-white duration-300  " onClick={()=>setShow(!show)} ><Link to={'/signup'}>Signup</Link></button> </li>
            <li> <button className="border-2 border-white rounded-full py-1 text-lg min-w-[100px] text-blue-400 font-semibold  hover:bg-blue-600 hover:text-white duration-300   " onClick={()=>setShow(!show)} ><Link to={'/login'}>login</Link></button> </li>
           </ul>


            )}
        </div>
    </div>
  )
}

export default Navbar