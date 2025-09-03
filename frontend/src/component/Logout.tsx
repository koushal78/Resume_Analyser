import useLogout from "../hooks/useLogout"

const Logout = () => {
    const{loading,logout} = useLogout();

     const handleLogout = async(e:any)=>{
        e.preventDefault();
        await logout();
     }
    
  return (
    <div>
        <button  onClick={handleLogout} className="text-white primary-btn" >{loading ? <p>loading...</p> : <p>logout</p>}</button>
    </div>
  )
}

export default Logout