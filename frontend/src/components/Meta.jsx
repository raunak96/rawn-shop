import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
		</Helmet>
	);
};
Meta.defaultProps = {
	title: "Welcome to Rawn-Shop",
	description: "We sell the latest and best electronics at cheapest rate",
	keywords: "Electronics giant, next tech disruptor",
};

export default Meta;
