import http from "../../services/httpService";

import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
} from "./userTypes";

export const signup = (formData) => async (dispatch) => {
	dispatch({
		type: REGISTER_REQUEST,
	});
	try {
		const { data } = await http.post("/users", formData);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: REGISTER_FAILED,
			payload: err.response.data,
		});
	}
};

export const signin = (email, password) => async (dispatch) => {
	dispatch({
		type: LOGIN_REQUEST,
	});

	try {
		const { data } = await http.post("/auth", { email, password });
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: LOGIN_FAILED,
			payload: err.response.data,
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
