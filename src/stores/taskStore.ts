import { defineStore } from 'pinia';
import { http } from "@/utils/http";
import { manageStoreErrors } from "@/utils/storeErrors";
import { CommonResponse, CommonResponseData } from "@/interfaces/stores/storeInterfaces"

export const useTaskStore = defineStore({
	id: 'task',
	state: () => ({
		isLoading: false,
		tasks: [] as any[],
		taskGroups: [] as any[],
		taskStatuses: [] as any[],
	}),
	actions: {
		async getList(): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				const { data } = await http.get<CommonResponse>("/tasks");
				this.isLoading = false;
				this.tasks = data.data.tasks;
				return {
					error: false,
					data: data.data.tasks
				}
			} catch (error: any) {
				this.isLoading = false;
				return manageStoreErrors(error);
			}
		},
		async getRequiredData(): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				const { data } = await http.get<CommonResponse>("/tasks/fieldsData");
				this.isLoading = false;
				this.taskGroups = data.data.taskGroups;
				this.taskStatuses = data.data.taskStatuses;
				return {
					error: false,
				}
			} catch (error: any) {
				this.isLoading = false;
				return manageStoreErrors(error);
			}
		},
	}
});
