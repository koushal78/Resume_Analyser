import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
const Footer = () => {
  return (
    <div  className="bg-gray-900">
        <div className="max-w-[85vw] mx-auto flex justify-between items-center  gap-4  min-h-[100px]">
            <div>
                <p className="text-blue-500 text-lg font-bold">Analyser</p>
            </div>
            <ul className="flex gap-2 text-blue-300 text-xl">
                <li><FaLinkedin/></li>
                <li><RiInstagramFill/></li>
            </ul>
            <p className="text-lg font-semibold text-blue-100">BY KOUSHAL KUMAR</p>
        </div>
    </div>
  )
}

export default Footer