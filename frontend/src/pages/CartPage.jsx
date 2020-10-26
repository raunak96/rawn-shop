import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from "../components/Message";

const CartPage = () => {
    const {id}= useParams();
    const history= useHistory();
    const queryParam = useLocation().search;
    const qty= Number((new URLSearchParams(queryParam)).get('qty'));
    const {cartItems} = useSelector(state=>state.cart);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(id)
            dispatch(addToCart(id,qty));
    },[dispatch,id,qty]);
    const handleCheckout=(e)=> history.push(`/login?redirect=shipping`);
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    !(cartItems && cartItems.length>0)?(<Message>Your cart is Empty</Message>):(
                        <ListGroup variant="border">
                            { cartItems?.map(cartItem=>(
                                <ListGroup.Item key={cartItem._id}>
                                    <Row>
                                        <Col md={3}><Image src={cartItem.image} alt={cartItem.name} fluid rounded></Image></Col>
                                        <Col md={3}><Link to={`/products/${cartItem._id}`}>{cartItem.name}</Link></Col>
                                        <Col md={2}>₹{cartItem.price}</Col>
                                        <Col md={2}>
                                            <Form.Control as="select" className="pl-2" custom value={cartItem.qty} onChange={(e)=> dispatch(addToCart(cartItem._id,Number(e.target.value)))}>
                                            {
                                                [...new Array(cartItem.countInStock)].map((x,i)=>(
                                                    <option key={i+1} value={i+1}>{i+1}</option>
                                                ))
                                            }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button variant="light" type="button" onClick={(e)=> dispatch(removeFromCart(cartItem._id))}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )) }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                SubTotal ({cartItems.reduce((acc,curr)=>acc+curr.qty,0)}) items
                            </h2>₹{cartItems.reduce((acc,curr)=>acc+curr.qty*curr.price,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn btn-block" type="button" disabled={cartItems.length===0} onClick={handleCheckout}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartPage;