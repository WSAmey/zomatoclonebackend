import express from "express";
import {fetchRestaurant,fetchLocation, fetchMealtype, fetchRestByCity, fetchRestByMealtypeLocation,getRestaurantsById, fetchCities, fetchByCuisine, fetchByLocationAndCuisine, fetchByCostRange, fetchByCostOrder, addMenu, getMenusByRestaurId, addOrder, getOrder} from "../controller/restaurController.js";
import { userLogin, userRegister } from "../controller/userController.js";

const route=express.Router();

route.get("/getAllRestaurants",fetchRestaurant) //http://localhost:5000/getAllRestaurants

route.get("/getAllLocations",fetchLocation) //http://localhost:5000/getAllLocations

route.get("/getAllMealTypes",fetchMealtype) //http://localhost:5000/getAllMealTypes

route.get("/getAllRestaurants/:city/:id",fetchRestByCity)

route.get("/getRestaurById/:id",getRestaurantsById);

route.get("/getRestaurByCostRange/:lcost/:hcost/:id",fetchByCostRange);

route.get("/getRestaurByCostOrder/:order/:id",fetchByCostOrder);

route.get("/getCities",fetchCities);

route.get("/getCuisine/:cuisine",fetchByCuisine);

route.get("/getByLocationAndCuisine/:location/:cuisine/:id",fetchByLocationAndCuisine);


route.get("/getAllRestaurantsByMealTypes/:mealtype_id?/:location_id?/:cuisine?/:min_price",fetchRestByMealtypeLocation)

route.post("/addMenu",addMenu);

route.get("/getMenusByRestaurId/:rest_id",getMenusByRestaurId);

route.post("/registerUser",userRegister);

route.post("/LoginUser",userLogin);

route.post("/addOrder",addOrder);

route.get("/getOrder/:email",getOrder);

export default route;
