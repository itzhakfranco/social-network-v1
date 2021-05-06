import http from "../../services/httpService";
import * as actionTypes from "./postsType";

export const fetchPosts = () => async (dispatch) => {
	dispatch({
		type: actionTypes.FETCH_POSTS_REQUEST,
	});
	const { data } = await http.get("/posts");

	dispatch({
		type: actionTypes.FETCH_POSTS_SUCCESS,
		payload: data,
	});

	return data;
};

export const addPost = (formData) => async (dispatch) => {
	dispatch({
		type: actionTypes.ADD_POST_REQUEST,
	});
	const { data } = await http.post("/posts", formData);

	dispatch({
		type: actionTypes.ADD_POST_SUCCESS,
		payload: data,
	});
};
export const deletePost = (postId) => async (dispatch) => {
	await http.delete(`/posts/${postId}`);

	dispatch({
		type: actionTypes.DELETE_POST,
	});
};
