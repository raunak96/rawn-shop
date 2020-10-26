import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOrderHistory } from '../actions/orderActions';
import { updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import OrderHistory from '../components/OrderHistory';

const ProfilePage = () => {
    const [formData,setFormData] = useState({email:'',password:'',confirmPassword:'',name:''});
    const [message,setMessage] = useState(null);
    const {email,password,name,confirmPassword} = formData;
    const {userInfo,loading,error,success} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading: loadingOrders, error: errorOrders, orders } = useSelector(state=>state.orderHistory);


    useEffect(() => {
        if(!userInfo)
            history.push("/login");
        else{
            dispatch(getOrderHistory());
            setFormData(prevState=>({...prevState,name: userInfo.name, email:userInfo.email}));
        }
    }, [history, userInfo,dispatch]);

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = e =>{
        e.preventDefault();
        if(password!==confirmPassword)
            setMessage("Passwords do not match!");
        else if(password.length>0 && (password.length<6 || password.length>15))
            setMessage("Password must be between 6-15 characters long");
        else{
            setMessage(null);
            dispatch(updateUserProfile({name,email,password}));
        }
    }

    return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
                <Meta title={`${name} | Profile`} />
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profile Successfully Updated</Message>}
                {loading ? <Loader />:(
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control type="text" name="name" value={name} placeholder="Enter Full Name" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" name="email" value={email} placeholder="Enter Email Id" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={password}  placeholder="Enter Password" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={handleChange} />
                        </Form.Group>
                        <Button type="submit" variant="warning">Update</Button>
                    </Form>
                )}
			</Col>
            < Col md={9}>
                <h2>My Orders</h2>
                {
                    loadingOrders ? (<Loader />) : errorOrders ? (<Message variant="danger">{errorOrders}</Message>) :(
                        <Table striped responsive bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                orders.map(order=>(
                                    <OrderHistory key={order._id} order={order} />
                                ))    
                            }
                            </tbody>
                        </Table>
                    )
                }
            </Col>
		</Row>
	);
};

export default ProfilePage;