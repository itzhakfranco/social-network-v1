import http from "../../services/httpService";
import * as actionTypes from "./profileType";

//Prfoile Section

export const createProfile = (formData) => async (dispatch) => {
	dispatch({
		type: actionTypes.CREATE_PROFILE_REQUEST,
	});
	const { data } = await http.post("/profile", formData);

	dispatch({
		type: actionTypes.CREATE_PROFILE_SUCCESS,
		payload: data,
	});
};
export const fetchProfileById = (profileId) => async (dispatch) => {
	dispatch({
		type: actionTypes.FETCH_PROFILE_BY_ID_REQUEST,
	});
	const { data } = await http.get(`/profile/${profileId}`);

	dispatch({
		type: actionTypes.FETCH_PROFILE_BY_ID_SUCCESS,
		payload: data,
	});
};
export const fetchUserProfile = () => async (dispatch) => {
	try {
		dispatch({
			type: actionTypes.FETCH_PROFILE_REQUEST,
		});

		const { data } = await http.get("/profile");
		dispatch({
			type: actionTypes.FETCH_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.FETCH_PROFILE_FAILED,
		});
	}
};

export const updateProfile = (profileData, profileId) => async (dispatch) => {
	dispatch({
		type: actionTypes.UPDATE_PROFILE_REQUEST,
	});

	const { data } = await http.put(`/profile/${profileId}`, profileData);
	dispatch({
		type: actionTypes.UPDATE_PROFILE_SUCCESS,
		payload: data,
	});
};

export const deleteProfile = (profileId) => async (dispatch) => {
	dispatch({
		type: actionTypes.DELETE_PROFILE_REQUEST,
	});

	await http.delete(`/profile/${profileId}`);
	dispatch({
		type: actionTypes.DELETE_PROFILE_SUCCESS,
	});
};

//Experience Section

export const addExperience = (formData) => async (dispatch) => {
	dispatch({
		type: actionTypes.CREATE_EDUCATION_REQUEST,
	});
	const { data } = await http.post("/profile/experience", formData);
	dispatch({
		type: actionTypes.CREATE_EDUCATION_SUCCESS,
		payload: data,
	});
};

export const fetchExperienceById = (experienceId) => async (dispatch) => {
	dispatch({
		type: actionTypes.FETCH_EDUCATION_BY_ID_REQUEST,
	});

	const { data } = await http.get(`/profile/experience/${experienceId}`);

	dispatch({
		type: actionTypes.FETCH_EDUCATION_BY_ID_SUCCESS,
		payload: data,
	});

	return data;
};

export const updateExperience = (experienceId, updatedExperience) => async (
	dispatch
) => {
	dispatch({
		type: actionTypes.UPDATE_EDUCATION_REQUEST,
	});

	const { data } = await http.put(
		`/profile/experience/edit/${experienceId}`,
		updatedExperience
	);

	dispatch({
		type: actionTypes.UPDATE_EDUCATION_SUCCESS,
		payload: data,
	});
};

export const deleteExperience = (experienceId) => async (dispatch) => {
	dispatch({
		type: actionTypes.DELETE_EDUCATION_REQUEST,
	});

	const { data } = await http.delete(`/profile/experience/${experienceId}`);

	dispatch({
		type: actionTypes.DELETE_EDUCATION_SUCCESS,
		payload: data,
	});
};

//Education Section

export const addEducation = (formData) => async (dispatch) => {
	dispatch({
		type: actionTypes.CREATE_EDUCATION_REQUEST,
	});
	const { data } = await http.post("/profile/education", formData);
	dispatch({
		type: actionTypes.CREATE_EDUCATION_SUCCESS,
		payload: data,
	});
};

export const fetchEducationById = (educationId) => async (dispatch) => {
	dispatch({
		type: actionTypes.FETCH_EDUCATION_BY_ID_REQUEST,
	});

	const { data } = await http.get(`/profile/education/${educationId}`);

	dispatch({
		type: actionTypes.FETCH_EDUCATION_BY_ID_SUCCESS,
		payload: data,
	});

	return data;
};

export const updateEducation = (educationId, updatedEducation) => async (
	dispatch
) => {
	dispatch({
		type: actionTypes.UPDATE_EDUCATION_REQUEST,
	});

	const { data } = await http.put(
		`/profile/education/edit/${educationId}`,
		updatedEducation
	);

	dispatch({
		type: actionTypes.UPDATE_EDUCATION_SUCCESS,
		payload: data,
	});
};

export const deleteEducation = (educationId) => async (dispatch) => {
	dispatch({
		type: actionTypes.DELETE_EDUCATION_REQUEST,
	});

	const { data } = await http.delete(`/profile/education/${educationId}`);

	dispatch({
		type: actionTypes.DELETE_EDUCATION_SUCCESS,
		payload: data,
	});
};
