export const monthNames = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Setiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];
export const dayNames = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];


const formatDateObject = (currentDate: Date) => {
	return {
		dateObject: currentDate,
		active: false,
	};
};

export const addDays = (currentDate: Date, days: number) => {
	const newDate = new Date(currentDate.getTime());
	newDate.setDate(newDate.getDate() + days);
	return newDate;
};

export const getDatesBetweenRange = (startDate: Date, stopDate: Date): Array<any> => {
	const currentDatesArray = new Array();
	let currentDate = new Date(startDate.getTime());
	while (currentDate <= stopDate) {
		currentDatesArray.push(currentDate);
		currentDate = new Date(addDays(currentDate, 1).getTime());
	}
	return currentDatesArray;
};