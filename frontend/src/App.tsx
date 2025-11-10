import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
import SignUp from "./Pages/Signup/SignUp"
import { Toaster } from "react-hot-toast"
import Login from "./Pages/login/Login"
import Upload from "./Pages/upload/Upload"
import ProtectedRoute from "./component/ProtectedRoute"
import Analyse_Page from "./Pages/Analyse_Page/Analyse_Page"
import Profile from "./Pages/Profile/Profile"



const App = () => {
  return (
    <>
    
    <div className="bg-black     ">
      <div className=" w-[85vw] mx-auto">

<div className="flex justify-center">
      <Navbar/>

</div>
      <Routes>

<Route path="/" element={<Home/>}/>
<Route path="/upload" element= {   <ProtectedRoute><Upload/></ProtectedRoute>    }/>
<Route path="/signup" element={<SignUp/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/Analyse" element={     <ProtectedRoute><Analyse_Page/></ProtectedRoute>     }/>
<Route path="/Profile" element={ <ProtectedRoute>
  <Profile/>
</ProtectedRoute>}/>
      </Routes>
      <Toaster/>
      </div>

    </div>
      <Footer/>
    </>
  )
}

export default App