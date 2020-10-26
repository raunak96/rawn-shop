import React from "react";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import { LinkContainer } from "react-router-bootstrap";

const Order = ({ order }) => {
	return (
		<tr>
			<td>{order._id}</td>
			<td>{order.user && order.user.name}</td>
			<td>
				<Moment format="Do MMM YYYY">{order.createdAt}</Moment>
			</td>
			<td>₹{order.totalPrice}</td>
			<td>
                {order.isPaid ? (<Moment format="Do MMM YYYY">{order.paidAt}</Moment>):(<i className='fas fa-times' style={{ color: 'red' }}></i>)}
            </td>
			<td>
                {order.isDelivered ? (<Moment format="Do MMM YYYY">{order.deliveredAt}</Moment>):(<i className='fas fa-times' style={{ color: 'red' }}></i>)}
            </td>

			<td>
				<LinkContainer to={`/orders/${order._id}`}>
					<Button variant="light" className="btn-sm">
						Details
					</Button>
				</LinkContainer>
			</td>
		</tr>
	);
};

export default Order;
