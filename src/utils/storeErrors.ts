export const manageStoreErrors = (error: any) => {
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