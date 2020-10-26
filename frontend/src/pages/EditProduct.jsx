import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import Message from '../components/Message';

const EditProduct = () => {
    const [formData,setFormData] = useState({name:"",price:0,image:"",category:"",description:"",brand:"",countInStock:0});
    const [uploading, setUploading] = useState(false);
    const {name,price,image,brand,description,category,countInStock} = formData;

    const {id} = useParams();
    const history = useHistory();

    const {error,loading,product} = useSelector(state=> state.productDetails);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!product || product._id!==id)
            dispatch(getProductDetails(id));
        else
            setFormData(prev=>({...prev, name:product.name,price:product.price,image:product.image,category:product.category,description:product.description,brand:product.brand,countInStock:product.countInStock}));
    },[dispatch, id ,product]);

    const handleChange = (e)=>{
        const {name, value} = e.target;
            setFormData({...formData, [name]: value});
    }
    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(updateProduct(history,formData,id));
    }
    const uploadFileHandler = async(e)=>{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image',file);
        setUploading(true);
        try {
            const config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            const { data } = await axios.post('/api/uploads', formData, config)
            setFormData(prev=>({...prev, image: data}))
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    return (
		<>
			<Link to="/admin/productList" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loading ? (
					<Loader />
				) : (error) ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="name" name="name" placeholder="Enter name" value={name} onChange={handleChange}></Form.Control>
						</Form.Group>
						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" name="price" placeholder="Enter price" value={price} onChange={handleChange}></Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control type="text" name="image" placeholder="Enter image Url" value={image} onChange={handleChange}></Form.Control>
                            <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler} />
                            {uploading && <Loader />}
						</Form.Group>


						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control type="text" name="brand" placeholder="Enter Brand Name" value={brand} onChange={handleChange}></Form.Control>
						</Form.Group>
                        <Form.Group controlId="countInStock">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control type="number" name="countInStock" placeholder="Enter countInStock" value={countInStock} onChange={handleChange}></Form.Control>
						</Form.Group>
						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control type="text" name="category" placeholder="Enter Category" value={category} onChange={handleChange}></Form.Control>
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" name="description" placeholder="Enter Description" value={description} onChange={handleChange}></Form.Control>
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

export default EditProduct;