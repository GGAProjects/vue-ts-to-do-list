import axios, { AxiosInstance } from "axios";

const useAxios = () => {
	const instance: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_BASE_URL,
		headers: {
			"Content-Type": "application/json"
		}
	});

	const get = (path: string) => {
		return instance.get(path);
	};

	const post = (path: string, payload: any) => {
		return instance.request({
			method: "POST",
			url: path,
			responseType: "json",
			data: payload
		});
	};

	return {
		get,
		post
	};
};

export default useAxios;
