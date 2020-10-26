import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

// login user
export const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && await user.matchPassword(password)){
        const {_id,name,email,isAdmin} = user;
        res.status(200).json({_id,name,email,isAdmin,token:generateToken(_id)});
    }else{
        res.status(401);
        throw new Error('Invalid Email and/or Password');
    }
});
// register User
export const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    const userExists = await User.findOne({email});
    if (userExists) {
		res.status(400);
		throw new Error("User already exists");
    }
    const user = await User.create({name,email,password}); 
    if (user) {
        const { _id, name, email, isAdmin } = user;
        res.status(200).json({_id,name,email,isAdmin,token:generateToken(_id)});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

//Get user Profile
export const getUserProfile = asyncHandler(async(req,res)=>{
    const user =await User.findById(req.user).select("-password");
    if(user){
        const {_id,name,email,isAdmin} = user;
        res.status(200).json({_id,name,email,isAdmin});
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

//Update User Profile (update self profile)
export const updateProfile= asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user);
    if (user) {
        for(let key in req.body)
            if(req.body[key])
                user[key] = req.body[key];
        const updatedUser = await user.save();
        const {_id,name,email,isAdmin} = updatedUser;
        res.status(200).json({_id,name,email,isAdmin,token:generateToken(_id)});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// ----------------------- ADMIN CONTROLLERS ----------------------------------------------

export const getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({});
    res.json(users);
});

export const getUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found!");
	}
})

export const updateUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if (user) {
        for(let key in req.body)
                user[key] = req.body[key];
        const updatedUser = await user.save();
        const {_id,name,email,isAdmin} = updatedUser;
        res.status(200).json({_id,name,email,isAdmin});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
})

export const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        await user.remove();
        res.json({message: "User removed"});
    }else{
        res.status(404);
        throw new Error('User not found!');
    }
})