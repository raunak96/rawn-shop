import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {

    const {userInfo} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(logout());
    }

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>Rawn-Shop</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart"></i>
									Cart
								</Nav.Link>
							</LinkContainer>
                            {
                                userInfo ? (
                                    <>
                                        <NavDropdown title={userInfo.name} id="username">
                                            <LinkContainer to="/profile">
                                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Item onClick={handleLogout}>
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        {
                                            userInfo.isAdmin && (
                                                <NavDropdown title="Admin" id="admin">
                                                    <LinkContainer to="/admin/userList">
                                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                                    </LinkContainer>
                                                    <LinkContainer to="/admin/productList">
                                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                                    </LinkContainer>
                                                    <LinkContainer to="/admin/orderList">
                                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                                    </LinkContainer>
                                                </NavDropdown>
                                            )
                                        }
                                    </>
                                ):(
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className="fas fa-user"></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                )
                            }
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
