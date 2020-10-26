const orderActionTypes = {
	ORDER_CREATE_REQ: "ORDER_CREATE_REQ",
	ORDER_CREATE_SUCCESS: "ORDER_CREATE_SUCCESS",
	ORDER_CREATE_FAIL: "ORDER_CREATE_FAIL",

	ORDER_DETAILS_FAIL: "ORDER_DETAILS_FAIL,",
	ORDER_DETAILS_SUCCESS: "  ORDER_DETAILS_SUCCESS,",
	ORDER_DETAILS_REQ: "  ORDER_DETAILS_REQ",

	ORDER_PAY_REQ: "ORDER_PAY_REQ",
	ORDER_PAY_SUCCESS: "ORDER_PAY_SUCCESS",
	ORDER_PAY_FAIL: "ORDER_PAY_FAIL",
	ORDER_PAY_RESET: "ORDER_PAY_RESET",

	ORDER_HISTORY_REQ: "ORDER_HISTORY_REQ",
	ORDER_HISTORY_SUCCESS: "ORDER_HISTORY_SUCCESS",
	ORDER_HISTORY_FAIL: "ORDER_HISTORY_FAIL",
	ORDER_HISTORY_RESET: "ORDER_HISTORY_RESET",

	ORDER_LIST_FAIL: "ORDER_LIST_FAIL",
	ORDER_LIST_SUCCESS: "ORDER_LIST_SUCCESS",
	ORDER_LIST_REQ: "ORDER_LIST_REQ",

	ORDER_DELIVER_FAIL: "ORDER_DELIVER_FAIL",
	ORDER_DELIVER_SUCCESS: "ORDER_DELIVER_SUCCESS",
	ORDER_DELIVER_REQ: "ORDER_DELIVER_REQ",
	ORDER_DELIVER_RESET: "ORDER_DELIVER_RESET"
};

export default orderActionTypes;
