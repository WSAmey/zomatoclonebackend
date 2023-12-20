import restaurant from "../model/restaurModel.js";
import location from "../model/locationModel.js";
import mealtype from "../model/mealtypeModel.js";
import menu from "../model/MenuModel.js"
import order from "../model/orderModel.js"


export const fetchRestaurant= async (req,res)=>{
    try {
        const restdata  = await restaurant.find()
        if(restdata.length ===0){
            return res.status(404).json({message:"restaurant data not found"})
        }
        else{
            res.status(200).json(restdata);
        }
    } catch (error) {
        res.status(500).json({error: " Internal Server error"})

    }
}
export const fetchCities=async(req,res)=>{
    try {
        const cityData=await location.distinct("city");
        if(!cityData){
            res.status(404).json({message:"No Results Found"})
        }
        else{
            res.status(200).json({cityData});
        }
    } catch (error) {
        
    }
}

export const fetchByCuisine=async(req,res)=>{
    try {
        const cuisine=req.params.cuisine;
        const cityData=await restaurant.find({"cuisine.name":cuisine});
        if(!cityData){
            res.status(404).json({message:"No Results Found"})
        }
        else{
            res.status(200).json({cityData})
        }
    } catch (error) {
        
    }
}

export const fetchLocation= async (req,res)=>{
    try {
        const locationData  = await location.find()
        if(locationData.length ===0){
            return res.status(404).json({message:"restaurant data not found"})
        }
        else{
            res.status(200).json({locationData});
        }
    } catch (error) {
        res.status(500).json({error: " Internal Server error"})

    }
}

export const fetchMealtype= async (req,res)=>{
    try {
        const mealtypeData  = await mealtype.find()
        if(mealtypeData.length ===0){
            return res.status(404).json({message:"restaurant data not found"})
        }
        else{
            res.status(200).json(mealtypeData);
        }
    } catch (error) {
        res.status(500).json({error: " Internal Server error"})

    }
}

export const fetchRestByCity= async (req,res)=>{
    try {
        const {city,id}=req.params;
        const restcitydata  = await restaurant.find({city:city,mealtype_id:id})
        if(restcitydata.length ===0){
            return res.status(404).json({message:"restaurant data not found"})
        }
        else{
            res.status(200).json(restcitydata);
        }
    } catch (error) {
        res.status(500).json({error: " Internal Server error"})

    }
}

export const getRestaurantsById=async(req,res)=>{
    try {
        const id=req.params.id;
        const restaurData=await restaurant.find({mealtype_id:id})
        if(!restaurData){
            return res.status(404).json({message:"No results found!"})
        }
        else{
            res.status(200).json({restaurData});
        }
    } catch (error) {
        
    }
}

export const fetchRestByMealtypeLocation= async (req,res)=>{
    try {
        // const mealTypeId = req.params.mealtype_id;
        // const locationId = req.params.location_id;
        // const cuisine=req.params.cuisine;
        // const minPrice = req.params.min_price;

        const {mealtype_id,location_id,cuisine,min_price}=req.params;

        const restcitydata  = await restaurant.find(
            {mealtype_id:mealtype_id},
            {location_id:location_id},
            {cuisine:cuisine} ,
            {min_price:min_price}).select("name city city_id locality thumb aggregate_rating rating_text min_price contact_number cuisine image mealtype_id").sort({name:1})

        if(restcitydata.length === 0){
            return res.status(404).json({message:"restaurant data not found"})
        }
        else{
            res.status(200).json(restcitydata);
        }
    } catch (error) {
        res.status(500).json(error)

    }
}

export const fetchByLocationAndCuisine=async(req,res)=>{
    try {
        const {location,cuisine,id}=req.params;
        console.log(location,cuisine);
        const restaurData= await restaurant.find({city:location,"cuisine.name":cuisine,mealtype_id:id});
        if(!restaurData){
            return res.status(404).json({message:"restaurant data not found"})

        }
        else{
            res.status(200).json({restaurData});
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const fetchByCostRange = async (req, res) => {
    try {
        const { lcost, hcost, id } = req.params;
        const selectCity = req.query.selectCity || "";

        const query = {
            min_price: {
                $gte: lcost,
                $lte: hcost
            },
            mealtype_id: id
        };

        // Include city condition if selectCity is not empty
        if (selectCity) {
            query.city = selectCity;
            //query.city is a property of the query object that is dynamically added based on whether selectCity has a truthy value (i.e., it's not an empty string). The purpose is to include a filter for the city field in the MongoDB query only if selectCity is not empty.
        }

        const restaurData = await restaurant.find(query);

        if (!restaurData) {
            return res.status(404).json({ message: "restaurant data not found" });
        } else {
            res.status(200).json({ restaurData });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const fetchByCostOrder = async (req, res) => {
    try {
        const { order, id } = req.params;
        const selectCity = req.query.selectCity || "";
        
        let sortOrder;
        if (order && order === "low") {
            sortOrder = 1; // Default ascending order
        } else if (order && order === "high") {
            sortOrder = -1; // Descending order
        }

        const query = {
            mealtype_id: id
        };

        // Include city condition if selectCity is not empty
        if (selectCity) {
            query.city = selectCity;
            //query.city is a property of the query object that is dynamically added based on whether selectCity has a truthy value (i.e., it's not an empty string). The purpose is to include a filter for the city field in the MongoDB query only if selectCity is not empty.
        }

        const restaurData = await restaurant.find(query).sort({ min_price: sortOrder });

        if (!restaurData) {
            return res.status(404).json({ message: "restaurant data not found" });
        } else {
            res.status(200).json({ restaurData });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const addMenu=async(req,res)=>{
    try {
        const data=req.body;
        
        await menu.create(data);
        res.status(200).json({message:"Menu has been added successfully"});

    } catch (error) {
        console.log(error);        
    }
}

export const getMenusByRestaurId=async(req,res)=>{
    try {
        const restaurId=req.params.rest_id;
        const menuData= await menu.find({rest_id:restaurId});
        if(!menuData){
            return res.status(404).json({message:"No result found"})
        }
        else{
            res.status(200).json({menuData});
        }
    } catch (error) {
        console.log(error);
    }
}

export const addOrder = async (req, res) => {
    try {
        const data = req.body;

        const { usemail, restaurname, restaurcity,restaurlocality, totalamount, ordername, address,restaurimage} = data;
        console.log("Posting order data...", usemail, restaurname, restaurcity,restaurlocality, totalamount, ordername, address,restaurimage);

        // Check if useremail is provided and not null
        if (!usemail) {
            return res.status(400).json({ message: "useremail is required" });
        }

        // Check if ordername is an array before using flat
        const ordername1 = Array.isArray(ordername) ? ordername.flat() : [];

        // Create a new Order document
        // const newOrder = new Order();

        // Save the new order to the database
        const savedOrder = await order.create({
            usemail: usemail,
            restaurname: restaurname,
            restaurcity: restaurcity,
            restaurlocality:restaurlocality,
            totalamount: totalamount,
            ordername: ordername1,
            address: address,
            restaurimage:restaurimage  
        })
        // Respond with a success message or the saved order
        res.status(201).json(savedOrder);
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            res.status(400).json({ message: "Duplicate useremail" });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
        console.log(error);
    }
};
export const getOrder=async(req,res)=>{
    try {
        const {email}=req.params;
        console.log("Received email:", email);

        const orderData=await order.find({usemail:email});
        if(!orderData){
            return res.status(404).json({message:"No order data found"})
        }
        else{
            res.status(200).json({orderData})
        }
    } catch (error) {
        console.log(error);
    }
}