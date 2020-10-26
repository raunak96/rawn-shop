import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, pageNumber, isAdminList = false, keyword = "" }) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages)].map((x, i) => (
					<LinkContainer
						key={i + 1}
						to={
							!isAdminList
								? keyword
									? `/?keyword=${keyword}&pageNumber=${i+1}`
									: `/?pageNumber=${i+1}`
								: `/admin/productList?pageNumber=${i+1}`
						}>
                            <Pagination.Item active={pageNumber===i+1}>{i+1}</Pagination.Item>
                        </LinkContainer>
				))}
			</Pagination>
		)
	);
};

export default Paginate;
