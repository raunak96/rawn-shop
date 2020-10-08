import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import colors from "colors";

import connectoDb from "./config/db.js";

dotenv.config();

connectoDb();

const app = express();

app.get("/",(req,res)=>{
    res.send("API running");
});

app.get("/api/products",(req,res)=>{
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
	const product = find(product => product._id === req.params.id);
	res.json(product);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.green.bold));