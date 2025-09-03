
import { IoReorderThreeSharp } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const Navbar = () => {
    const{user} = useAuthContext();
  return (
    <div className="md:w-[70vw] w-full">
        <div className=" text-white py-4  ">
            <div className="border-2 border-blue-800 shadow-2xl  shadow-blue-950 flex justify-between items-center text-blue-200 px-4  rounded-full py-2">
                <div><p className="font-semibold text-xl">Analyser</p></div>
                <div className="md:hidden">
                    <p className="text-3xl">
                        <IoReorderThreeSharp />
                    </p>

                </div>



                <div className="hidden md:block">
                    {
                        user ? (
                            <Logout/>

                        ):
                    (<ul className="flex gap-2 ">
                        <li> <button className=" primary-btn  " ><Link to={'/signup'}>Signup</Link></button> </li>
                        <li> <button className="primary-btn" ><Link to={'/login'}>login</Link></button> </li>
                    </ul>)
                    }
                </div>




            </div>

        </div>
    </div>
  )
}

export default Navbar