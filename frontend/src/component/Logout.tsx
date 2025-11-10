import useLogout from "../hooks/useLogout"

const Logout = () => {
    const{loading,logout} = useLogout();

     const handleLogout = async(e:any)=>{
        e.preventDefault();
        await logout();
     }
    
  return (
    <div>
        <p  onClick={handleLogout}  >{loading ? <p>loading...</p> : <p>logout</p>}</p>
    </div>
  )
}

export default Logout