import  jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

//Goal: control and protect the route
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error: "Unauthorized - No token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error: "Unauthorized - No token Provided"});
        }

        //Find the id decoded, remove the password and we have user 
        const user = await User.findById(decoded.userId).select("-password");
        
        //Verify the user
        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        //Finally this user is the user in db
        req.user = user;

        //So you have the permission to go in the next function
        next();

    } catch (error) {
        console.log("Error in protectRoute middlware: ", error.message)
        res.status(500).json({error: "Internal server error"});
    }
};

export default protectRoute;

