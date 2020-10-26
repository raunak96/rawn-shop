import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RegisterPage = () => {
    const [formData,setFormData] = useState({email:'',password:'',confirmPassword:'',name:''});
    const [message,setMessage] = useState(null);
    const {email,password,name,confirmPassword} = formData;
    const {userInfo,loading,error} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const redirect = (new URLSearchParams(useLocation().search)).get('redirect');

    useEffect(()=>{
        if(userInfo){
            history.push(redirect? redirect:"/");
        }
    },[history,userInfo,redirect]);
    const handleChange=(e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(password!==confirmPassword)
            setMessage("Passwords do not match");
        else
            dispatch(register(email,name,password));
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading ? <Loader />:(
                <>
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
                            <Form.Control type="password" name="password" value={password} minLength={6} maxLength={15} placeholder="Enter Password" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={confirmPassword} minLength={6} maxLength={15} placeholder="Confirm Password" onChange={handleChange} />
                        </Form.Group>
                        <Button type="submit" variant="success">Register</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                            Already Have an Account?&nbsp;
                            <Link to={redirect ? `/login?redirect=${redirect}`:"/login" }>Login</Link>
                        </Col>
                    </Row>
                </>
            )}
        </FormContainer>
    );
}; 

export default RegisterPage;