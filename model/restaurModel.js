import mongoose, {mongo} from "mongoose" ;

const resturaSchema=new mongoose.Schema({
    name:{
        type:String,

    }, 
    rest_id:{
        type:Number
    },
    city:{
        type:String
    } ,
    location_id:{
        type:Number
    } ,
    city_id:{
        type:Number
    },
    locality:{
        type:String
    },
    thumb:{
        type:Array
    } ,
    aggregate_rating:{
        type:Number
    }, 
    rating_text:{ 
        type:String
    },
    min_price:{
        type:Number
    } ,
    contact_number:{
        type:Number
    } ,
    cuisine:[ {
        
        id: { type: Number },
        name: { type: String }
      }],
    image:{
      type:String  
    },
    mealtype_id:{
        type:Number
    },

})

export default mongoose.model("restaurant",resturaSchema);

