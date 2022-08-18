import { defineStore } from 'pinia';

import { http } from "@/utils/http";

interface LoginModel {
	email: string;
	password: string;
}

interface ResponseExample {
	statusCode: number,
	message: string,
	data: any
}

interface LoginResponse {
	data?: any,
	error: boolean,
	message?: string,
	errors?: any
}



export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		user: {},
		token: localStorage.getItem("token") ?? null,
	}),
	actions: {
		async login(model: LoginModel): Promise<LoginResponse> {
			try {
				const { data } = await http.post<ResponseExample>("/users/login", { ...model });
				this.token = data.data.token;
				localStorage.setItem("token", data.data.token);
				return {
					error: false,
				}
			} catch (error: any) {
				if (error.data) {
					return {
						error: true,
						errors: error.data.errors
					}
				}

				return {
					error: true,
					errors: error
				}
			}
		},
		logout() {
			alert("LOGOUT")
		}
	}
});
