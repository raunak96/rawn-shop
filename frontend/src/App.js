import React from "react";
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'

import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrder from "./pages/PlaceOrder";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import ProductListPage from "./pages/ProductListPage";
import EditUser from "./pages/EditUser";
import EditProduct from "./pages/EditProduct";
import OrderListPage from "./pages/OrderListPage";

const App = () => {
	return (
		<Router>
            <Header />
			<main className="py-3">
				<Container>
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/shipping" component={ShippingPage} />
                        <Route exact path="/payment" component={PaymentPage} />
                        <Route exact path="/placeorder" component={PlaceOrder} />
                        <Route exact path="/products/:id" component={ProductPage} />
                        <Route exact path="/cart/:id?" component={CartPage} />
                        <Route exact path="/orders/:orderId" component={OrderPage} />
                        <Route exact path="/admin/userList" component={UserListPage} />
                        <Route exact path="/admin/productList" component={ProductListPage} />
                        <Route exact path="/admin/orderList" component={OrderListPage} />
                        <Route exact path="/admin/user/:id/edit" component={EditUser} />
                        <Route exact path="/admin/product/:id/edit" component={EditProduct} />
                    </Switch>
				</Container>
			</main>
            <Footer />
		</Router>
	);
};

export default App;
