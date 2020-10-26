import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUsers,deleteUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import User from '../components/User';

const UserListPage = () => {

    const {loading, error , users,userInfo} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(()=>{
        if(!userInfo){
            history.push("/login?redirect=/admin/userList");
        }
        else if(userInfo.isAdmin)
            dispatch(getUsers());
        else
            history.push("/");
    },[dispatch,history,userInfo]);

    const deleteHandler = id => {
		if (window.confirm("Are you sure")) {
            dispatch(deleteUser(id));
		}
    };
    
    return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped responsive bordered hover size="sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<User key={user._id} user={user} deleteHandler={deleteHandler} />
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListPage;