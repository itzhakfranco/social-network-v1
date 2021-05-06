import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./user/userReducer";
import profileReducer from "./profile/profileReducer";
import profilesReducer from "./profiles/profilesReducer";
import postsReducer from "./posts/postsReducer";

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
	user: userReducer,
	profile: profileReducer,
	profiles: profilesReducer,
	posts: postsReducer,
});

const loadState = () => {
	try {
		const serializedState = localStorage.getItem("state");
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (e) {
		return undefined;
	}
};

const saveState = (state) => {
	const serializedState = JSON.stringify(state);
	localStorage.setItem("state", serializedState);
};

const store = createStore(
	rootReducer,
	loadState(),
	composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
	saveState(store.getState());
});

/* Serialization is an expensive operation. 
You should use a throttle function (like the one implemented by lodash) 
to limit the number of saves.

Eg:

import throttle from 'lodash/throttle';

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000)); */

export default store;
