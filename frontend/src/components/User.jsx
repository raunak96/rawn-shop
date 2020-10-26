import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const User = ({user,deleteHandler}) => {
    
    return (
		<tr>
			<td>{user._id}</td>
			<td>{user.name}</td>
			<td>
				<a href={`mailto:${user.email}`}>{user.email}</a>
			</td>
			<td>
				{user.isAdmin ? (
					<i className="fas fa-check" style={{ color: "green" }}></i>
				) : (
					<i className="fas fa-times" style={{ color: "red" }}></i>
				)}
			</td>
			<td>
				<LinkContainer to={`/admin/user/${user._id}/edit`}>
					<Button variant="light" className="btn-sm">
						<i className="fas fa-edit"></i>
					</Button>
				</LinkContainer>
				<Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
					<i className="fas fa-trash"></i>
				</Button>
			</td>
		</tr>
	);
};

export default User;