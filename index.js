import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import route from "./routes/restaurRoute.js";
import cors from 'cors';
import {Stripe} from "stripe";

//in front end we use publishable key and in backend we have to use secret key




const app=express();

app.use(express.json()); //this will parse request body in json
app.use(cors());
dotenv.config();
const stripe = new Stripe(process.env.SEC_Key);

let uemail,totalamount,phoneno,ordemail,ordaddress,restname,restcity,restlocality,restimage;

// stripe checkout api

app.post("/api/create-checkout-session",async(req,res)=>{
    let ordername=[]; 

    const {orders,subtotal,useremail,phonenum,orderaddress,restaurname,restaurcity,restaurlocality,restaurimage}=req.body;
    console.log(orders, subtotal);
    console.log(typeof orders);
    uemail=useremail;
    totalamount=subtotal;
    phoneno=phonenum;
    ordaddress=orderaddress;
    restname=restaurname;
    restcity=restaurcity;
    restlocality=restaurlocality;
    restimage=restaurimage;

    orders.forEach((menu) => {
        ordername.push(menu.name);
    });

console.log("subtotal: ", subtotal);
    const lineItems=orders.map((menu,index)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name: menu.name,
                images:[menu.image]
            },
            unit_amount:menu.price * 100,

        }, 
        //here whatever amount we get, it will be converted to decimal with 2 zeros so we need to multiply the amount with 100

        quantity:menu.quantity
    }));
    console.log("lineItems: ",lineItems);
    console.log("orderName: ",ordername, typeof ordername,"Is Array: ", Array.isArray(ordername));
    console.log("user email: ",uemail);
    console.log("order email",ordemail, "delivery address: ",ordaddress," phone no: ",phoneno);
    console.log("restaurant image: ",restimage);

console.log("totalamount: ",totalamount);
    const session =await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        
        success_url: `http://localhost:3000/success?uemail=${uemail}&totalamount=${totalamount}&ordername=${encodeURIComponent(JSON.stringify(ordername))}&phoneno=${phoneno}&ordaddress=${ordaddress}&restname=${restname}&restcity=${restcity}&restlocality=${restlocality}&restimage=${restimage}`,

        cancel_url:"http://localhost:3000/cancel",
        
    });
    
    res.json({id:session.id})
 
})



app.use("/",route)


const PORT=process.env.PORT || 5000

const MONGOURL= process.env.MONGO_URL

mongoose.connect(MONGOURL).then(()=>{

    console.log("Database connected successfully");

    app.listen(PORT,()=>{

        console.log(`Server is running on port: ${PORT}`);

    })

}).catch((error)=>{
    console.log(error);
})

