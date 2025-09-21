
import { useAuthContext } from "@/context/AuthContext";
import useFeedback from "@/hooks/useFeedback";


import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { MdInsights } from "react-icons/md";
import { Link } from "react-router-dom"


type Feature = {
  icon: React.ReactNode;
  title:string;
  desc:string

}

const Home = () => {


  const{loading,feedbacks,getAllFeedback} = useFeedback();

const { user, loading: userLoading } = useAuthContext()

useEffect(() => {
  // Only make API call when user loading is complete AND user exists
  if (!userLoading && user && (user._id || user.id)) {
    const userId = user._id || user.id;
    console.log("Making API call with userId:", userId);
    getAllFeedback(userId);
  }
}, [user, userLoading])

if (userLoading) {
  return (
    <div className="text-white text-center py-8">
      <p>Loading...</p>
    </div>
  );
}

// Keep the existing loading check:
if (loading) return <p className="text-white">Loading feedbacks ....</p>

  


   const features:Feature[] = [
    {
      icon: <MdInsights />,
      title: "AI Resume Feedback",
      desc: "Get instant insights to improve your resume with AI.",
    },
    {
      icon: <FaCheckCircle  />,
      title: "ATS Score Check",
      desc: "Ensure your resume passes recruiter screening systems.",
    },
    {
      icon: <IoMdGitCompare/>,
      title: "Job Match Analysis",
      desc: "See how well your resume matches any job description.",
    },
  ];
  return (
    
    <div>
      <section className="min-h-[calc(100vh-82px)] ">
      <div className="flex flex-col gap-8  items-center md:flex-row justify-between pt-16 ">
        <div className="space-y-4 text-4xl md:text-5xl md:space-y-8 ">
<p className="text-blue-100  text-start font-bold   ">Analyse Your Resume with AI</p>
<p className=" text-start text-gray-500 text-lg ">Review your resume with AI feedback and get shortlisted.</p>

        <button className="text-white bg-blue-700 rounded-md px-2 py-2 text-xl font-semibold hover:bg-blue-800 hover:shadow-2xl shadow-blue-300 ">
          <Link to={'/upload'}>
           Upload Resume
          </Link>
         
          
          </button>
          
        </div>

        

        <div className="w-fill shadow-2xl shadow-blue-600 ">
          
          <img src="/resume_image.png" alt="resume_image"
           className="rounded-md w-[300px] md:w-[400px] md:h-[500px]  brightness-[50%]"
           
           />
        </div>
           

       
      </div>

      </section>
      <section className="min-h-screen">
        <div className=" mt-20">
          <h2 className="text-3xl font-semibold text-white text-center my-8">Features</h2>

       <div className="w-full px-6 py-12">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center mt-[15%]">
    {features.map((f, idx) => (
      <div
        key={idx}
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700 shadow-lg rounded-2xl flex flex-col items-center text-center px-6 py-10 w-full max-w-[320px] hover:scale-105 hover:shadow-blue-500/40 transition-transform duration-300"
      >
      
        <div className="text-blue-400 text-5xl mb-4">{f.icon}</div>

        
        <h3 className="text-xl font-semibold text-blue-200 mb-2">
          {f.title}
        </h3>

        
        <p className="text-sm text-gray-300 leading-relaxed">
          {f.desc}
        </p>
      </div>
    ))}
  </div>
</div>

</div>

      </section>

      <section className="f-full py-8 ">
 
           <h2 className="text-2xl font-semibold text-gray-300 text-center w-full my-4">Review your old Resume</h2>

        <ul className="grid md:grid-cols-3 gap-4 place-items-center">

     {
  feedbacks && feedbacks.length > 0 ? (
    feedbacks.map((e, idx) => (
      <li className="text-white" key={idx}>
      <img src={e.resumePath} alt="Resume_Image" className="h-[300px] rounded-md cursor-pointer" />
      </li>
    ))
  ) : (
    <div className="w-full flex flex-col items-center gap-2">
      <p className=" text-2xl text-gray-600 font-semibold">No feedback </p>
      <button className="text-white bg-blue-700 rounded-md px-2 py-2 text-xl font-semibold hover:bg-blue-800 hover:shadow-2xl shadow-blue-300 w-fit ">
          <Link to={'/upload'}>
           Upload Resume
          </Link>
         
          
          </button>

    </div>
  )
}


        </ul>

      </section>
      
    </div>
  )
}

export default Home