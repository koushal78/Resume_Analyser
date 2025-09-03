import axios from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";



type AuthContextType={
    user:any;
    setUser:(user:any)=>void
    loading:boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)



export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AUthProvider = ({children}:{children:ReactNode})=>{

    const [user,setUser] = useState<any>(null)
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
      (async ()=>{
        try {
          const res  =  await axios.get("/api/auth/me",{withCredentials: true})
          setUser(res.data.user)
          
        } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
      }) ()
    },[])

    return(
     <AuthContext.Provider value={{user,setUser,loading}}>

        {children}
     </AuthContext.Provider>
    )
}