export const fillExpectedDateFilter = (currentDate: Date) => {

	const timeRegex = /(?<=T).*(?=Z)/gm;

	const isoDateTime = currentDate.toISOString();

	return {
		expectedDate: {
			gte: isoDateTime.replace(timeRegex, "00:00:00.000"),
			lte: isoDateTime.replace(timeRegex, "23:59:59.000"),
		},
	}
}