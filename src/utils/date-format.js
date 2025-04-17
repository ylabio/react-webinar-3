export default function DateFormat(toISOString) {
  const select = {
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const dateTime = new Date(toISOString);

  const formatDateTime = dateTime.toLocaleString('ru-RU', select);

  const formatDate = formatDateTime.replace(' г.', ' ');

  return formatDate;
}
