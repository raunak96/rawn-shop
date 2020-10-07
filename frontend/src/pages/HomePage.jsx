import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomePage = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        const fetchProducts = async _=>{
            const {data} = await axios.get("/api/products");
            setProducts(data);
        }
        fetchProducts();
    },[]);
	return (
		<Fragment>
			<h1>Latest Products</h1>
			<Row>
				{products.map(product => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</Fragment>
	);
};

export default HomePage;
