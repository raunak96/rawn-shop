import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const PaymentPage = () => {

    const history = useHistory();
    const {shippingAddress} = useSelector(state=>state.cart);
    if(!shippingAddress)
        history.push("/shipping");

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const handleChange = e=> setPaymentMethod(e.target.value);
    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>payment Method</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" value="PayPal" name="paymentMethod" checked={paymentMethod==="PayPal"} onChange={handleChange} />
                        <Form.Check type="radio" label="Stripe" id="Stripe" name="paymentMethod" value="Stripe" checked={paymentMethod==="Stripe"} onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentPage;