import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const ShippingPage = () => {
    const {shippingAddress} = useSelector(state=>state.cart);
    const dispatch = useDispatch();

    const history = useHistory();

    const [formData,setFormData] = useState({address:"",city:"",postalCode:"",country:""});
    const {address,city,postalCode,country} = formData;
    
    useEffect(()=>{
        if(shippingAddress)
            setFormData(prevState=>({...prevState,...shippingAddress}));
    },[shippingAddress]);
    

    const handleChange = e =>{
        const {name,value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = e=>{
        e.preventDefault();
        dispatch(saveShippingAddress({...formData}));
        history.push("/payment");
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={handleSubmit} >
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={address} name="address" placeholder="Enter Address" required onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" value={city} name="city" placeholder="Enter City" required onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" value={postalCode} name="postalCode" placeholder="Enter Postal Code" required onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" value={country} name="country" placeholder="Enter Country" required onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingPage;