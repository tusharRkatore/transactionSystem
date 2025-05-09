require('dotenv').config();
const mongoose=require('mongoose');
const URI=process.env.MONGODB_URI;
const connectDB=async()=>{
    try{
      await  mongoose.connect(URI);
      console.log("Connection Successful");
    }
    catch(error)
    {
        console.error("connection Failed");
        process.exit(0);
    }
}
module.exports=connectDB;