import React from "react";
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'

import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

const App = () => {
	return (
		<Router>
            <Header />
			<main className="py-3">
				<Container>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/products/:id" component={ProductPage} />
                    </Switch>
				</Container>
			</main>
            <Footer />
		</Router>
	);
};

export default App;
