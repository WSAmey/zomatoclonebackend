import mongoose, {mongo} from "mongoose" ;

const mealtypeSchema=new mongoose.Schema({
    name:{
        type:String,
    }, 
    content:{
        type:String
    },
    image:{
        type:String
    },
    meal_type:{
        type:Number
    }

})

export default mongoose.model("mealtype",mealtypeSchema);

