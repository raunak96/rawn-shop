import asyncHandler from "express-async-handler";
import Product from "../models/product.js";
import User from "../models/user.js";

export const getProducts=asyncHandler(async(req,res)=>{
    const keyword = req.query.keyword ? {
        name:{$regex: req.query.keyword, $options: 'i'}
    } : {};
    const pageNumber = Number(req.query.pageNumber) || 1, pageSize=4;

    const noOfProducts = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword}).limit(pageSize).skip((pageNumber-1)*pageSize);
    
    res.status(200).json({products,pageNumber,pages: Number(Math.ceil(noOfProducts/pageSize))});
});

export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) res.status(200).json(product);
	else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: "Product removed" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
})

export const createProduct = asyncHandler(async(req,res)=>{
    const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user,
		image: "/images/sample.jpg",
		brand: "Sample brand",
		category: "Sample category",
		countInStock: 0,
		numReviews: 0,
		description: "Sample description",
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

export const updateProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        for(let key in req.body){
            product[key] = req.body[key];
        }
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct); 
    }else{
        res.status(404);
        throw new Error("Product not found!");
    }
});

export const createProductReview = asyncHandler(async(req,res)=>{
    const {rating, comment} = req.body;
    const user = await User.findById(req.user);
    const product = await Product.findById(req.params.id);
    if(product){
        if(product.reviews.find(review=> review.user.toString()=== req.user)){
            res.status(400);
            throw new Error("Product has already been reviewed!");
        }

        const review = {
            name: user.name, rating: Number(rating), comment, user: req.user
        }
        product.reviews = [review,...product.reviews];
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc,curr)=> acc+ curr.rating, 0) / product.numReviews;
        await product.save();
        res.status(201).json({ message: "Review added" });
    }else{
        res.status(404);
        throw new Error("Product not found!");
    }
});

export const getTopRatedProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({}).sort({rating:"desc"}).limit(3);
    res.json(products);
});