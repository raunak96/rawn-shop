import express from "express";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopRatedProducts, updateProduct } from "../controllers/product.js";
import {isAdmin,isAuthenticated} from "../middlewares/auth.js";

const router =express.Router();


router.route("/")
    .get(getProducts)
    .post(isAuthenticated,isAdmin,createProduct);

router.get("/top", getTopRatedProducts);

router.route("/:id")
    .get(getProductById)
    .delete(isAuthenticated,isAdmin,deleteProduct)
    .put(isAuthenticated,isAdmin,updateProduct);

router.post("/:id/reviews",isAuthenticated, createProductReview);


export default router;
