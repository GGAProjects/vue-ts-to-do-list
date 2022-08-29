import { defineStore } from 'pinia';
import { http } from "@/utils/http";
import { manageStoreErrors } from "@/utils/storeErrors";
import { CommonResponse, CommonResponseData } from "@/interfaces/stores/storeInterfaces"
import { TaskGroupModel } from '@/interfaces/stores/taskGroupStoreInterfaces';

export const useTaskGroupStore = defineStore({
	id: 'taskGroup',
	state: () => ({
		isLoading: false,
		taskGroups: [] as any[],
		taskGroup: null as any,
	}),
	actions: {
		async getList(): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				const { data } = await http.get<CommonResponse>("/taskGroups");
				this.isLoading = false;
				this.taskGroups = data.data.taskGroups;
				return {
					error: false,
				}
			} catch (error: any) {
				this.isLoading = false;
				return manageStoreErrors(error);
			}
		},
		async register(model: TaskGroupModel): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				await http.post<CommonResponse>("/taskGroups", model);
				this.isLoading = false;
				this.getList();
				return {
					error: false,
				}
			} catch (error: any) {
				this.isLoading = false;
				return manageStoreErrors(error);
			}
		},
		async get(id: string): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				const { data } = await http.get<CommonResponse>(`/taskGroups/${id}`);
				this.taskGroup = data.data.taskGroup;
				this.isLoading = false;
				return {
					error: false,
					data: data.data
				}
			} catch (error: any) {
				this.isLoading = false;
				return manageStoreErrors(error);
			}
		},
		async update(model: TaskGroupModel): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				await http.put<CommonResponse>(`/taskGroups/${model.id}`, model);
				this.isLoading = false;
				this.getList();
				return {
					error: false,
				}
			} catch (error: any) {
				this.isLoading = false;
				return manageStoreErrors(error);
			}
		},
		async destroy(id: string): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				await http.delete<CommonResponse>(`/taskGroups/${id}`);
				this.isLoading = false;
				this.getList();
				return {
					error: false,
				}
			} catch (error: any) {
				this.isLoading = false;
				return manageStoreErrors(error);
			}
		},
		controller(model: TaskGroupModel): Promise<CommonResponseData> {
			return !model.id ? this.register(model) : this.update(model);
		}
	}
});
