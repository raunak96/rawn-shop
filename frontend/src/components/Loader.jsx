import React from 'react';
import { Spinner } from 'react-bootstrap';

const style = {
	width: "100px",
	height: "100px",
	margin: "auto",
	display: "block",
};

const Loader = () => {
    return (
		<Spinner animation="border" role="status" variant="info" style={style}>
			<span className="sr-only">Loading...</span>
		</Spinner>
	);
};

export default Loader;