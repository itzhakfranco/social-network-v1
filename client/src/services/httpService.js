import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
axios.defaults.baseURL = "";
axios.defaults.headers.common["x-auth-token"] = token;

axios.interceptors.response.use(null, (error) => {
	const expectedError = error.response && error.response.status >= 403;
	if (expectedError) toast.error("An unexpected error occurred");
	return Promise.reject(error);
});

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	patch: axios.patch,
	delete: axios.delete,
};
