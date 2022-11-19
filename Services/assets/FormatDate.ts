export const DateFormat = (date: Date) => {
	let month = "" + (date.getMonth() + 1),
		day = "" + date.getDate(),
		year = date.getFullYear(),
		hour: number | string = date.getHours(),
		minute: number | string = date.getMinutes();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;
	if (hour < 10) hour = "0" + hour;
	if (minute < 10) minute = "0" + minute;

	return [year, month, day].join("-") + " " + [hour, minute].join(":");
};
