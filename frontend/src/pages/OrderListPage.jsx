import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {listOrders} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Order from "../components/Order";

const OrderListPage = () => {
	const { loading, error, orders } = useSelector(state => state.orderList);
	const { userInfo } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		if (!userInfo) history.push("/login?redirect=/admin/orderList");
		else if (userInfo.isAdmin) dispatch(listOrders());
		else history.push("/");
	}, [dispatch, history, userInfo]);

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped responsive bordered hover size="sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map(order => (
							<Order key={order._id} order={order} />
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListPage;
