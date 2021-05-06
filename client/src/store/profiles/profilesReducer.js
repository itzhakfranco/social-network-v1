import * as actionTypes from "./profilesTypes";

const intialState = {
	profiles: null,
	loading: false,
};

const profilesReducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ALL_PROFILES_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_ALL_PROFILES_SUCCESS:
			return {
				...state,
				profiles: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default profilesReducer;
