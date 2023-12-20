import mongoose, {mongo} from "mongoose" ;

const menuSchema=new mongoose.Schema({
    name:{
        type:String,

    }, 
    rest_id:{
        type:Number
    },
    rest_name:{
        type:String
    },
    details:{
        type:String
    },
    
    price:{
        type:Number
    } ,
    
    image:{
      type:String  
    }
    
})

export default mongoose.model("menu",menuSchema);

