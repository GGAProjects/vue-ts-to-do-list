import { router } from "@/config/routes";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

enum HTTPStatus {
	OK = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZE = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	FIELDS_ERROR = 422,
	TOO_MANY_REQUESTS = 429,
	INTERNAL = 500,
	NOT_AVAILABLE = 503,
	GATEWAY = 504
}

const headers: Readonly<Record<string, string | boolean>> = {
	Accept: "application/json",
	"Content-Type": "application/json; charset=utf-8",
	"Access-Control-Allow-Credentials": true,
	"X-Requested-With": "XMLHttpRequest",
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
	try {
		const token = localStorage.getItem("token");

		if (token != null) {
			config.headers!.Authorization = `Bearer ${token}`;
		}
		return config;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

class Http {
	private instance: AxiosInstance | null = null;

	private get http(): AxiosInstance {
		return this.instance != null ? this.instance : this.initHttp();
	}

	initHttp() {
		const http = axios.create({
			baseURL: import.meta.env.VITE_BASE_URL,
			headers,
		});

		http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

		http.interceptors.response.use(
			(response) => response,
			(error) => {
				const { response } = error;
				return this.handleError(response);
			}
		);

		this.instance = http;
		return http;
	}

	request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
		return this.http.request(config);
	}

	get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.get<T, R>(url, config);
	}

	post<T = any, R = AxiosResponse<T>>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<R> {
		return this.http.post<T, R>(url, data, config);
	}

	put<T = any, R = AxiosResponse<T>>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<R> {
		return this.http.put<T, R>(url, data, config);
	}

	delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.delete<T, R>(url, config);
	}

	private handleError(error: AxiosResponse) {
		const { status } = error;

		router.push({})

		switch (status) {
			case HTTPStatus.INTERNAL: {
				break;
			}
			case HTTPStatus.FORBIDDEN: {
				break;
			}
			case HTTPStatus.UNAUTHORIZE: {
				router.replace({ name: "login" });
				break;
			}
			case HTTPStatus.TOO_MANY_REQUESTS: {
				router.replace({ name: "home" });
				break;
			}
		}

		return Promise.reject(error);
	}
}

export const http = new Http();