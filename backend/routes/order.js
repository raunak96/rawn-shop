import express from "express";
import { addOrderItems, getOrderById, getOrderHistory, getOrders, updateDeliveredStatus, updatePaidStatus } from "../controllers/order.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
    .post(isAuthenticated,addOrderItems)
    .get(isAuthenticated,getOrderHistory); 

router.get("/all",isAuthenticated,isAdmin,getOrders);

router.route("/:id").get(isAuthenticated,getOrderById);

router.route("/:id/pay").put(isAuthenticated,updatePaidStatus);

router.route("/:id/deliver").put(isAuthenticated,isAdmin,updateDeliveredStatus);

export default router;