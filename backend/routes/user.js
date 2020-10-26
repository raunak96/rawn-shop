import express from "express";
import { deleteUser, getUserById, getUserProfile, getUsers, loginUser, registerUser, updateProfile, updateUser } from "../controllers/user.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(registerUser)
    .get(isAuthenticated,isAdmin,getUsers);
    
router.post("/login",loginUser);

router.route("/profile")
    .get(isAuthenticated,getUserProfile)
    .put(isAuthenticated,updateProfile);

router.route("/:id")
    .delete(isAuthenticated,isAdmin,deleteUser)
    .get(isAuthenticated,isAdmin,getUserById)
    .put(isAuthenticated,isAdmin,updateUser);

export default router;