import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getOrderById, resetOrder, updateDeliverStatus, updatePaidStatus } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Moment from "react-moment";

import {PayPalButton} from "react-paypal-button-v2"

const OrderPage = () => {
    const {orderId} = useParams();

    const {error, loading, order} = useSelector(state=> state.orderDetails);
    const { loading: loadingPay, success: successPay } = useSelector(state=> state.orderPay);
    const { loading: loadingDelivery, success: successDelivery } = useSelector(state=> state.orderDelivery);
    const {userInfo} = useSelector(state=>state.user);

    const dispatch = useDispatch();
    const history = useHistory();
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(()=>{
        const addPayPalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`;
			script.async = true;

			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
        if(!userInfo)
            history.push("/login");
        else if(!order || successPay || successDelivery){
            dispatch(resetOrder());
            dispatch(getOrderById(orderId));
        }else if(!order.isPaid){
            if(!window.paypal)
                addPayPalScript();
            else
                setSdkReady(true);
        }
    },[dispatch,orderId,order,successPay,successDelivery,history,userInfo]);

    const handleSuccess = paymentResult =>{
        console.log(paymentResult);
        dispatch(updatePaidStatus(orderId,paymentResult));
    }

    const deliverHandler = () => dispatch(updateDeliverStatus(orderId));

    return loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) :(
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}><i className="fas fa-envelope"></i> {order.user.email}</a></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {
                                order.isDelivered ? (<Message variant="success">Delivered on <Moment format="Do MMM YYYY">{order.deliveredAt}</Moment></Message>):(
                                    <Message variant="danger">Not Delivered</Message>
                                )
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>Method: </strong>{order.paymentMethod}</p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on <Moment format="Do MMM YYYY">{order.paidAt}</Moment></Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                order.orderItems.length===0 ? (<Message variant="warning">Order is empty</Message>):(
                                    <ListGroup variant="flush">
                                        {
                                            order.orderItems.map(item=>(
                                                <ListGroup.Item key={item._id}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={5}>
                                                            {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₹{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₹{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>₹{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {
                                !order.isPaid && (
                                    <ListGroup.Item>
                                        { loadingPay || !sdkReady ? (<Loader />):(
                                            <PayPalButton amount={(order.totalPrice)} onSuccess={handleSuccess} currency="INR" />
                                        )}
                                    </ListGroup.Item>
                                )
                            }
                            {
                                (userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered) && loadingDelivery ? (<Loader />) :(
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
};

export default OrderPage;