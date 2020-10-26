import React, { Fragment, useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
    const {loading,error,products, pages, pageNumber} = useSelector(state=>state.productList);
    const dispatch = useDispatch();

    const queries= new URLSearchParams(useLocation().search);
    const keyword = queries.get("keyword") || "";
    const page = queries.get("pageNumber") || 1;

    useEffect(()=>{
        dispatch(listProducts(keyword,page));
    },[dispatch,keyword,page]);
	return (
		<Fragment>
            {
                !keyword ? (<ProductCarousel />) : (<Link to="/" className="btn btn-light">Go Back</Link>)
            }
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pageNumber={pageNumber} pages={pages} keyword={keyword} />
                </>
			)}
		</Fragment>
	);
};

export default HomePage;
