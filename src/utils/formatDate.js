import useTranslate from "../hooks/use-translate";

export default function formatDate(inputDate) {

	const {t} = useTranslate();

	const months = [
		t('comment.january'),
		t('comment.february'),
		t('comment.march'),
		t('comment.april'),
		t('comment.june'),
		t('comment.july'),
		t('comment.august'),
		t('comment.september'),
		t('comment.october'),
		t('comment.november'),
		t('comment.december'),
	];

	const date = new Date(inputDate);

	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formattedDate = `${day} ${month} ${year} ${t('comment.at')} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

	return formattedDate;
}