import React, { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { createProduct, deleteProduct, listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import SingleProduct from "../components/SingleProduct";

const ProductListPage = () => {
    
    const {loading, error, products, pages, pageNumber} = useSelector(state=> state.productList);
    const {userInfo} = useSelector(state=> state.user);
    const dispatch = useDispatch();
    
    const page=new URLSearchParams(useLocation().search).get("pageNumber") || 1;

	const history = useHistory();

	useEffect(() => {
		if (!userInfo)
			history.push("/login?redirect=/admin/productList");
        else if (userInfo.isAdmin) 
            dispatch(listProducts("",page));
        else 
            history.push("/");
	}, [dispatch, history, userInfo,page]);

	const deleteHandler = id => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteProduct(id));
		}
    };
    
    const createHandler = ()=>{
        dispatch(createProduct(history));
    }

	return (
		<>
            <Row className="align-items-center">
                <Col><h1>Users</h1></Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
                <>
                    <Table striped responsive bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <SingleProduct key={product._id} product={product} deleteHandler={deleteHandler} />
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pageNumber={pageNumber} pages={pages} isAdminList />
                </>
			)}
		</>
	);
};

export default ProductListPage;
