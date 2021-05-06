import http from "../../services/httpService";
import * as actionTypes from "./profilesTypes";

//Prfoile Section

export const fetchAllProfiles = () => async (dispatch) => {
	dispatch({
		type: actionTypes.FETCH_ALL_PROFILES_REQUEST,
	});

	const { data } = await http.get("/profile/view/profiles");
	dispatch({
		type: actionTypes.FETCH_ALL_PROFILES_SUCCESS,
		payload: data,
	});
	return data;
};
