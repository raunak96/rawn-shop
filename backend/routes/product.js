import { Router } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

const router =Router();

// Get all Products
router.get("/",asyncHandler(async(req,res)=>{
        const products = await Product.find({});
        res.json(products);
}));

// Get single product(by Id)
router.get("/:id",asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product)
        res.json(product);
    else{
        res.status(404);
        throw new Error("Product not found");
    }
}));

export default router;
