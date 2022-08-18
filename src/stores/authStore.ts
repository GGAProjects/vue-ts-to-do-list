import { defineStore } from 'pinia';
import { http } from "@/utils/http";
import { manageStoreErrors } from "@/utils/storeErrors";
import { LoginModel } from "@/interfaces/stores/authStoreInterfaces"
import { CommonResponse, CommonResponseData } from "@/interfaces/stores/storeInterfaces"

const tokenIndex = 'token';

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		user: {},
		token: localStorage.getItem(tokenIndex) ?? null,
	}),
	actions: {
		async login(model: LoginModel): Promise<CommonResponseData> {
			try {
				const { data } = await http.post<CommonResponse>("/users/login", { ...model });
				this.token = data.data.token;
				localStorage.setItem(tokenIndex, data.data.token);
				return {
					error: false,
				}
			} catch (error: any) {
				return manageStoreErrors(error);
			}
		},
		logout() {
			localStorage.removeItem(tokenIndex);
		}
	}
});
