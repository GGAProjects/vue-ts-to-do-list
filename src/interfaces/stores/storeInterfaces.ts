export interface CommonResponse {
	statusCode: number,
	message: string,
	data: any
}

export interface CommonResponseData {
	isLoading?: boolean,
	data?: any,
	error: boolean,
	message?: string,
	errors?: any
}