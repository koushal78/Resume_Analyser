
import mongoose from "mongoose"





const connect =async(URL)=>{
    try {
        await mongoose.connect(URL);
        console.log("connection with mongoose");
        
    } catch (error) {
        console.log("problem to connect",error);
        
    }


}

export default connect;