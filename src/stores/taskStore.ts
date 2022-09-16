import { defineStore } from 'pinia';
import { http } from "@/utils/http";
import { manageStoreErrors } from "@/utils/storeErrors";
import { CommonResponse, CommonResponseData } from "@/interfaces/stores/storeInterfaces"
import { TaskModel } from '@/interfaces/stores/taskStoreInterfaces';
import { fillExpectedDateFilter } from '@/utils/filters';

export const useTaskStore = defineStore({
	id: 'task',
	state: () => ({
		isLoading: false,
		tasks: [] as any[],
		taskCategories: [] as any[],
		taskStatuses: [] as any[],
		task: null as any,
	}),
	actions: {
		async getList(filters = {}): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				const { data } = await http.get<CommonResponse>(`/tasks/?filters=${JSON.stringify(filters)}`);
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
				this.taskCategories = data.data.taskCategories;
				this.taskStatuses = data.data.taskStatuses;
				return {
					error: false,
				}
			} catch (error: any) {
				this.isLoading = false;
				return manageStoreErrors(error);
			}
		},
		async register(model: TaskModel): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				const { data } = await http.post<CommonResponse>("/tasks", model);
				this.isLoading = false;
				this.getList({ ...fillExpectedDateFilter(new Date(data.data.task.expectedDate)) });
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
				const { data } = await http.get<CommonResponse>(`/tasks/${id}`);
				this.task = data.data.task;
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
		async update(model: TaskModel): Promise<CommonResponseData> {
			this.isLoading = true;
			try {
				const { data } = await http.put<CommonResponse>(`/tasks/${model.id}`, model);
				this.isLoading = false;
				this.getList({ ...fillExpectedDateFilter(new Date(data.data.task.expectedDate)) });
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
				await http.delete<CommonResponse>(`/tasks/${id}`);
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
		async controller(model: TaskModel): Promise<CommonResponseData> {
			return !model.id ? this.register(model) : this.update(model);
		}
	}
});
