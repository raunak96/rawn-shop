import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import connectoDb from "./config/db.js";
import productRoutes from "./routes/product.js";
import { errorHandler, notFound } from "./middlewares/errors.js";

dotenv.config();

connectoDb();

const app = express();

app.get("/",(req,res)=>{
    res.send("API running");
});

app.use("/api/products",productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.green.bold));