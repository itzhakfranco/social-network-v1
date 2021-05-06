import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
} from "./userTypes";

import axios from "axios";

const intialState = {
	token: null,
	user_id: null,
	name: "",
	loading: false,
	error: null,
};

const userReducer = (state = intialState, action) => {
	const { payload } = action;
	switch (action.type) {
		case REGISTER_REQUEST:
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem("token", payload.token);
			axios.defaults.headers["x-auth-token"] = payload.token;

			return {
				token: payload.token,
				user_id: payload.user_id,
				name: payload.name,
				loading: false,
			};
		case LOGIN_FAILED:
		case REGISTER_FAILED:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				token: null,
				name: "",
				loading: false,
			};
		default:
			return state;
	}
};

export default userReducer;
