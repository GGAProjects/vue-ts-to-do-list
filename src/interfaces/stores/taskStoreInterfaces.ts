export interface TaskModel {
	id?: string;
	taskStatusId: string;
	taskCategoryId: string;
	task: string;
	description?: string;
	expectedDate: Date;
}