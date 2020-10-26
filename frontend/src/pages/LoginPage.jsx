import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginPage = () => {
    const [formData,setFormData] = useState({email:'',password:''});
    const {email,password} = formData;
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
        dispatch(login(email,password));
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading ? <Loader />:(
                <>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="email" value={email} placeholder="Enter Email Id" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={password} placeholder="Enter Password" onChange={handleChange} />
                    </Form.Group>
                    <Button type="submit" variant="success">Sign In</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                            New Customer?&nbsp;
                            <Link to={redirect ? `/register?redirect=${redirect}`:"/register" }>Register</Link>
                        </Col>
                    </Row>
                </>
            )}
        </FormContainer>
    );
};

export default LoginPage;