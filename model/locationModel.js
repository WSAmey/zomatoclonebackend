import mongoose, {mongo} from "mongoose" ;

const locationSchema=new mongoose.Schema({
    name:{
        type:String,

    }, 
    city_id:{
        type:Number
    },
    location_id:{
        type:Number
    },
    city:{
        type:String
    },
    country_name:{
        type:String
    }

})

export default mongoose.model("location",locationSchema);

