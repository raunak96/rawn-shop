import asyncHandler from "express-async-handler";
import Order from "../models/order.js";

export const addOrderItems = asyncHandler(async (req,res)=>{
    const {orderItems} = req.body;
    if(orderItems && orderItems.length===0){
        res.status(400);
        throw new Error("Order cannot be empty!");
    }else{
        const order = new Order({...req.body,user: req.user});
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

export const getOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({}).populate('user','_id name');
    res.status(200).json(orders);
});

export const getOrderById = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(order)
        return res.status(200).json(order);
    else{
        res.status(404);
        throw new Error('Order not found!');
    }

});

export const getOrderHistory = asyncHandler(async(req,res)=>{
    const orders = await Order.find({user: req.user});
    res.json(orders);
})

export const updatePaidStatus = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if (order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {...req.body};
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }     
	else {
		res.status(404);
		throw new Error("Order not found!");
	}

});

export const updateDeliveredStatus = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if (order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }     
	else {
		res.status(404);
		throw new Error("Order not found!");
	}

});