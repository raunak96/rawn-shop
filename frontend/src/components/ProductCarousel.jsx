import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopRatedProducts } from '../actions/productActions';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {

    const {loading, error, topProducts} = useSelector(state=>state.productList);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getTopRatedProducts());
    },[dispatch]);
    return loading ? (<Loader />) : error ? (<Message variant="danger" >{error}</Message>) :(
        <Carousel pause="hover" className="bg-dark">
        {
            topProducts.map(product=>(
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`} className="d-flex flex-column justify-content-between">
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption>
                            <h3>{product.name} (₹{product.price})</h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))
        }
        </Carousel>
    );
};

export default ProductCarousel;