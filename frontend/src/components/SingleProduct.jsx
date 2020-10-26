import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const SingleProduct = ({product,deleteHandler}) => {
    
    return (
		<tr>
			<td>{product._id}</td>
			<td>{product.name}</td>
			<td>₹{product.price}</td>
			<td>{product.category}</td>
			<td>{product.brand}</td>
			
			<td>
				<LinkContainer to={`/admin/product/${product._id}/edit`}>
					<Button variant="light" className="btn-sm">
						<i className="fas fa-edit"></i>
					</Button>
				</LinkContainer>
				<Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
					<i className="fas fa-trash"></i>
				</Button>
			</td>
		</tr>
	);
};

export default SingleProduct;