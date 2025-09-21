import { Link } from "react-router-dom"
import { useState } from "react";
import MyDropzone from "../../component/MyDropzone";
import useAnalyse from "../../hooks/useAnalyse";
import { useAuthContext } from "@/context/AuthContext";


const Upload = () => {
  const[input,setInput] = useState({
    company:"",
    title:"",
    description:"",

  })









  const [selectedFile,setSelectedFile] = useState<File | null>(null)
  
const{loading,analyse} = useAnalyse();

  const handleChange = (e:any) =>{
    
    setInput({...input,
      [e.target.name]:e.target.value
    })

    console.log(input)
  }

  const handleFileSelect = (file:File | null)=>{
    setSelectedFile(file)

    console.log("selected file:",file?.name);
    
    
  }
  
  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    
    if(!selectedFile){
      alert("Please select a file");
      
      return
    }
    
    const formData = new FormData()
    formData.append('company',input.company)
    formData.append('title',input.title)
    formData.append('description',input.description)
    formData.append('file',selectedFile)
    
    
   
   
    
    await analyse(formData);

    
    
     

    

    }


    


  

  return (
    <div>
      <div>
      
      <Link to={'/'} className=" bg-white text-black py-1 px-8 rounded-md font-semibold border-2 border-gray-400" >Return to Homepage</Link>

      </div>
       <div className="py-8">
        <div className="space-y-4 py-4">
          <p className="text-4xl text-white w-full text-center font-semibold">Upload your Resume</p>
          <p className="text-gray-500 text-center ">Drop your resume for an  ATS score and improvement tips</p>
        </div>
        <form action=""
         
         onSubmit={handleSubmit}
        
        className="border-blue-950 border-2 rounded-lg flex flex-col gap-8 p-8 max-w-[600px] mx-auto">
          <div className="text-white flex flex-col gap-2 w-full ">
            <label htmlFor="company_" className="font-semibold text-gray-300">Company Name</label>
            <input type="text" name="company" className="outline-none border-2 rounded-md py-1 px-4 border-gray-600 "
            value={input.company}
            onChange={handleChange}
            placeholder="Enter company name" />
          </div>
          <div className="text-white flex flex-col gap-2 w-full ">
            <label htmlFor="job" className="font-semibold text-gray-300" >Job Title</label>
            <input type="text" className="outline-none border-2 rounded-md py-1 px-4  border-gray-600  " 
            value={input.title}
            onChange={handleChange}
            name="title"
            placeholder="Enter the title" />
          </div>
          <div className="text-white flex flex-col gap-2 w-full ">
            <label htmlFor="job_description"className="font-semibold text-gray-300">Job Description</label>
            <textarea name="description" rows={7} id="" 
            value={input.description}
            onChange={handleChange}
            
            
            className="outline-none border-2 rounded-md py-1 px-4 border-gray-600  " placeholder="Enter the description"></textarea>
          </div>
          <div className="flex flex-col border-2 border-gray-600 p-4 rounded-lg justify-center items-center cursor-pointer">
            <div className="  text-gray-400">
              
              <MyDropzone  onFileSelect={handleFileSelect} selectedFile={selectedFile} />
            </div>
          

          </div>
          <div className="w-full text-center">

          <button className="text-white border-2 py-1 rounded-md  hover:bg-blue-800 duration-300 w-fit px-14 font-semibold  " >{
            loading ? <p>Analyse....</p> : <p>Analyse</p>
            
            }</button>
          </div>


        </form>
       </div>

    </div>
  )
}

export default Upload