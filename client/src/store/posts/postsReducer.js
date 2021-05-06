import * as actionTypes from "./postsType";

const intialState = {
	posts: null,
	loading: false,
};

const postsReducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_POSTS_REQUEST:
		case actionTypes.ADD_POST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_POSTS_SUCCESS:
			return {
				...state,
				posts: action.payload,
				loading: false,
			};
		case actionTypes.ADD_POST_SUCCESS:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				loading: false,
			};
		case actionTypes.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
				loading: false,
			};

		default:
			return state;
	}
};

export default postsReducer;
