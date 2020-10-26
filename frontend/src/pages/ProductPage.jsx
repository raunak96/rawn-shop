import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createProductReview, getProductDetails, reviewReset } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Rating from '../components/Rating';

const ProductPage = () => {

    const {id} = useParams();
    const history = useHistory();
    const [qty,setQty] = useState(1);
    const [review,setReview] = useState({rating:0, comment:""});
    const {rating,comment} = review;
    const productDetails = useSelector(state=>state.productDetails);
    const { loading, error, product } = productDetails;
    const {success:successReview, error: errorReview} = useSelector(state=>state.productReview)
    const {userInfo} = useSelector(state=>state.user)
    
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(successReview){
            alert("Review Submitted");
            setReview(prev=>({...prev, rating:0, comment:""}));
            dispatch(reviewReset());
        }
        dispatch(getProductDetails(id));
    },[dispatch,id,successReview]);

    const addToCartHandler=()=> history.push(`/cart/${id}?qty=${qty}`);

    const handleChange = e =>{
        const {name,value} = e.target;
        setReview({...review, [name]:value});
    }
    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(createProductReview(id,review));
    }

    return (
        <Fragment>
            <Link to="/" className="btn btn-outline-secondary my-3">Go Back</Link>
            {
                loading?<Loader /> : error ? <Message variant="danger">{error}</Message> :
                (<>
                    <Meta title={product.name} />
                    <Row>
                        <Col lg={5} md={4}><Image src={product.image} alt={product.name} fluid /></Col>
                        <Col lg={4} md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col lg={3} md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>₹{product.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock>0 ? 'Available':'Out of Stock' }
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {
                                        product.countInStock>0 &&(
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control as="select" className="pl-2" custom value={qty} onChange={e=>setQty(e.target.value)}>
                                                        {
                                                            [...new Array(product.countInStock)].map((x,i)=>(
                                                                <option key={i+1} value={i+1}>{i+1}</option>
                                                            ))
                                                        }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    <ListGroup.Item>
                                        <Button className="btn-block" type="button" disabled={product.countInStock===0} onClick={addToCartHandler}>
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                            
                        </Col>

                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.numReviews===0 && (<Message>No reviews</Message>)}
                            <ListGroup variant="flush">
                                {product.reviews.map(r=>(
                                    <ListGroup.Item key={r._id}>
                                        <strong>{r.name}</strong>
                                        <Rating value={r.rating} />
                                        <p><Moment format="Do MMM YYYY">{r.createdAt}</Moment></p>
                                        <p>{r.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Review...</h2>
                                    {errorReview && (<Message variant="danger">{errorReview}</Message>)}
                                    {userInfo? (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as="select" value={rating} onChange={handleChange} name="rating">
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as="textarea" row="3" value={comment} onChange={handleChange} name="comment" />
                                            </Form.Group>
                                            <Button type="submit" variant="primary">Submit</Button>
                                        </Form>
                                    ):(
                                        <Message>
                                            Please <Link to="/login">Sign In</Link> to write a Review.
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>)
            }
        </Fragment>
    );
};

export default ProductPage;