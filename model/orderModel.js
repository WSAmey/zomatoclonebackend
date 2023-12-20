import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({

    usemail:{
        type:String,
        required:true
    },
    restaurname:{
        type:String,
        required:true

    },
    restaurcity:{
        type:String,
        required:true

    },
    restaurlocality:{
        type:String,
        required:true
    },    
    restaurimage:{
        type:String,
        required:true
    },
    totalamount:{
        type:Number,
        required:true
    },
    ordername:{
        type:Array,
        required:true
    },
    address:{
        type:String,
        required:true
    },

    entrydate:{
        type:Date,
        default:Date.now
    },
});

export default mongoose.model('Order', orderSchema);