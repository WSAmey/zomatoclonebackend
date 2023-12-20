import signup from "../model/SignupModel.js"
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// // import dotenv from "dotenv";
// const SECRET_KEY="API123";

// dotenv.config();
// const SECRET_KEY=process.dotenv.Secret_Key

export const userRegister=async (req,res)=>{
   
        //Existing User Check
        //Hashed Password- password is not directly saved in database in form of plaintext, it is first encrypted or hashed then we save in database so that even if our database is hacked then he should get exact password 

        //User Creation
        //Token Generate
      const {fname,lname,mobilenumber,email,password}= req.body;
      try {
        const existingUser=await signup.findOne({email:email})

        if(existingUser){

            return res.json("User already exists") //status 400 is used for bad request that means the user you have requested is already exists in database

        }

        // const hashedPassword = await bcrypt.hash(password,10);
        await signup.create({
            fname: fname,
            lname: lname,
            mobilenumber: mobilenumber,
            email: email,
            password: password,
        })

        // const token=jwt.sign({email:result.email, id: result._id},SECRET_KEY )
        // res.status(201).json({user:result,token:token})

        res.json("Successull registration")


      } 
      catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
      }
    
}

export const userLogin=async (req,res)=>{
    const {email,password}=req.body;
   try {
      signup.findOne({email:email})
      .then(user=>{
        if(user){
            if(user.password === password){
                res.json({
                  message: "Success",
                  email: user.email,
                  fname: user.fname,
                  lname: user.lname,
                })
            }
            else{
                res.json("Invalid credentials")
            }
        }
        else{
            res.json("User does not exist")
        }
      }) 
      

   } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"})
    }
    
}

