export default function formatDate(dateStr) {
  const date = new Date(dateStr);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  return new Intl.DateTimeFormat('ru-RU', options).format(date).replace('г.', '');
}
