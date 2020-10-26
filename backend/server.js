import express, { json } from "express";
import dotenv from "dotenv";
import colors from "colors";

import connectoDb from "./config/db.js";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import uploadRoutes from "./routes/file-upload.js";
import { errorHandler, notFound } from "./middlewares/errors.js";
import morgan from "morgan";
import path from "path";

dotenv.config();

connectoDb();

const app = express();
app.use(express.json());
if(process.env.NODE_ENV==="development")
    app.use(morgan('dev'));

app.get("/",(req,res)=>{
    res.send("API running");
});

app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/uploads",uploadRoutes);

app.get("/api/config/paypal",(req,res)=> res.json(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.green.bold));