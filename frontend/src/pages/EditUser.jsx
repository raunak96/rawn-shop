import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import Message from '../components/Message';

const EditUser = () => {
    const [formData,setFormData] = useState({email:'',isAdmin:false,name:''});
    const {email,isAdmin, name} = formData;

    const {id} = useParams();
    const history = useHistory();

    const {loading, error, otherUser, successUpdate, errorUpdate} = useSelector(state=> state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(successUpdate)
            history.push("/admin/userList");
        if(!otherUser || otherUser._id!==id)
            dispatch(getUserDetails(id));
        else
            setFormData(prev=>({...prev, name: otherUser.name, isAdmin: otherUser.isAdmin, email: otherUser.email}));
    },[dispatch, id ,otherUser,history, successUpdate]);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        if(name==="isAdmin")
            setFormData(prev=>({...prev, isAdmin: !prev.isAdmin}))
        else
            setFormData({...formData, [name]: value});
    }
    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(updateUser(id,{name,email,isAdmin}));
    }
    return (
		<>
			<Link to="/admin/userList" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loading ? (
					<Loader />
				) : (error || errorUpdate) ? (
					<Message variant="danger">{error? error: errorUpdate}</Message>
				) : (
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="name" name="name" placeholder="Enter name" value={name} onChange={handleChange}></Form.Control>
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={handleChange}></Form.Control>
						</Form.Group>

						<Form.Group controlId="isadmin">
							<Form.Check type="checkbox" name="isAdmin" label="Is Admin" checked={isAdmin} onChange={handleChange}></Form.Check>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default EditUser;