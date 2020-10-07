import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';

const ProductPage = () => {
    const {id} = useParams();
    const [product,setProduct] = useState({});
    useEffect(()=>{
        const fetchProductById = async _=>{
            const {data} =await axios.get(`/api/products/${id}`);
            setProduct(data);
        }
        fetchProductById();
    },[id]);
    return Object.keys(product).length ? (
        <Fragment>
            <Link to="/" className="btn btn-outline-secondary my-3">Go Back</Link>
            <Row>
                <Col md={5}><Image src={product.image} alt={product.name} fluid /></Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
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
                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock===0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    
                </Col>

            </Row>
        </Fragment>
    ):<div>Loading...</div>;
};

export default ProductPage;