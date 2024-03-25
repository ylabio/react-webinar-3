export default function formatDate(inputDate) {
	const months = [
		"января", "февраля", "марта", "апреля", "мая", "июня",
		"июля", "августа", "сентября", "октября", "ноября", "декабря"
	];

	const date = new Date(inputDate);

	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formattedDate = `${day} ${month} ${year} в ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

	return formattedDate;
}