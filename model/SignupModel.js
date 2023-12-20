import mongoose from "mongoose" ;

const signupSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true,
    }, 
    mobilenumber:{ 
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
        
    }
   
})

export default mongoose.model("signup",signupSchema);

