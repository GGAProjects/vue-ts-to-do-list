import { defineStore } from 'pinia';
import { http } from "@/utils/http";
import { manageStoreErrors } from "@/utils/storeErrors";
import { CommonResponse, CommonResponseData } from "@/interfaces/stores/storeInterfaces"
import { TaskCategoryModel } from '@/interfaces/stores/taskCategoryStoreInterfaces';

export const useTaskCategoryStore = defineStore({
	id: 'taskCategory',
	state: () => ({
		isLoading: false,
		taskCategories: [] as any[],
		taskCategory: null as any,
	}),
	actions: {
		async getList(): Promise<CommonResponseData> {
			try {
				const { data } = await http.get<CommonResponse>("/taskCategories");
				this.taskCategories = data.data.taskCategories;
				return {
					error: false,
				}
			} catch (error: any) {
				return manageStoreErrors(error);
			}
		},
		async register(model: TaskCategoryModel): Promise<CommonResponseData> {
			try {
				await http.post<CommonResponse>("/taskCategories", model);
				this.getList();
				return {
					error: false,
				}
			} catch (error: any) {
				return manageStoreErrors(error);
			}
		},
		async get(id: string): Promise<CommonResponseData> {
			try {
				const { data } = await http.get<CommonResponse>(`/taskCategories/${id}`);
				this.taskCategory = data.data.taskCategory;
				return {
					error: false,
					data: data.data
				}
			} catch (error: any) {
				return manageStoreErrors(error);
			}
		},
		async update(model: TaskCategoryModel): Promise<CommonResponseData> {
			try {
				await http.put<CommonResponse>(`/taskCategories/${model.id}`, model);
				this.getList();
				return {
					error: false,
				}
			} catch (error: any) {
				return manageStoreErrors(error);
			}
		},
		async destroy(id: string): Promise<CommonResponseData> {
			try {
				await http.delete<CommonResponse>(`/taskCategories/${id}`);
				this.getList();
				return {
					error: false,
				}
			} catch (error: any) {
				return manageStoreErrors(error);
			}
		},
		controller(model: TaskCategoryModel): Promise<CommonResponseData> {
			return !model.id ? this.register(model) : this.update(model);
		}
	}
});
