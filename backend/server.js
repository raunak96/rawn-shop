const express=require("express");
const products = require("./data/products");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.get("/",(req,res)=>{
    res.send("API running");
});

app.get("/api/products",(req,res)=>{
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
	const product = products.find(product => product._id === req.params.id);
	res.json(product);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));