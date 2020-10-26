import React, { useEffect } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PlaceOrder = () => {
	const cart = useSelector(state=>state.cart);
	cart.itemsPrice = parseFloat(cart.cartItems.reduce((acc,curr)=> acc+curr.price*curr.qty,0)).toFixed(2);
	cart.shippingPrice = parseFloat(cart.itemsPrice > 1000 ? 0 : 200).toFixed(2);
	cart.taxPrice = parseFloat((cart.itemsPrice*0.15)).toFixed(2);
    cart.totalPrice = parseFloat(parseFloat(cart.itemsPrice)+parseFloat(cart.shippingPrice)+parseFloat(cart.taxPrice)).toFixed(2);
    
    const {order, success, error} = useSelector(state=> state.order);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(()=>{
        if(success)
            history.push(`/orders/${order._id}`);
    },[history,success,order]);

	const handleClick = ()=> {
        dispatch(createOrder({orderItems: cart.cartItems.map(item=>({...item,product:item._id})),shippingAddress: cart.shippingAddress,paymentMethod: cart.paymentMethod,itemsPrice: cart.itemsPrice,shippingPrice: cart.shippingPrice,taxPrice: cart.taxPrice,totalPrice: cart.totalPrice}));
    }
	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>{cart.paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{
								cart.cartItems.length===0 ? (<Message>Your cart is Empty</Message>) :(
									<ListGroup variant="flush">
										{
											cart.cartItems.map((cartItem,ind)=>(
												<ListGroup.Item key={ind}>
													<Row>
														<Col md={1}><Image src={cartItem.image} alt={cartItem.name} fluid rounded /></Col>
														<Col>
															<Link to={`/products/${cartItem._id}`}>{cartItem.name}</Link>
														</Col>
														<Col md={5}>{cartItem.qty} x ₹{cartItem.price} = ₹{(cartItem.price * cartItem.qty).toFixed(2)}</Col>
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
						<ListGroup variant="flush">
							<ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
							<ListGroup.Item><Row>
								<Col>Items</Col>
								<Col>₹{cart.itemsPrice}</Col>
							</Row></ListGroup.Item>
							<ListGroup.Item><Row>
								<Col>Shipping</Col>
								<Col>₹{cart.shippingPrice}</Col>
							</Row></ListGroup.Item>
							<ListGroup.Item><Row>
								<Col>Tax</Col>
								<Col>₹{cart.taxPrice}</Col>
							</Row></ListGroup.Item>
							<ListGroup.Item><Row>
								<Col>Total</Col>
								<Col>₹{cart.totalPrice}</Col>
							</Row></ListGroup.Item>
							<ListGroup.Item>
                            {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
							<ListGroup.Item>
								<Button type="button" className="btn btn-block" disabled={cart.cartItems.length===0} onClick={handleClick}>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrder;