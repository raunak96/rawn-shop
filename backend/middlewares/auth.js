import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const isAuthenticated = asyncHandler(async(req,res,next)=>{
    const authorization = req.headers["authorization"];
    const token = authorization ? authorization.replace("Bearer ", "") : "";
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decoded.id;
            next();
        } catch (error) {
            console.error(error);
			res.status(401);
			throw new Error("Not authorized, token failed");
        }
    }else{
		res.status(401);
		throw new Error("No token...Access denied!");
    }
});

export const isAdmin = asyncHandler(async(req,res,next)=>{
    if(req.user){
        const currentUser = await User.findById(req.user);
        if(currentUser && currentUser.isAdmin){
            return next();
        }
    }
    res.status(401);
    throw new Error("You don't have admin rights!!");
})