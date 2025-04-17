export default function formatDate(isoDate, locale = 'ru-RU') {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);

  const day = date.getDate();
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${monthName} ${year} в ${hours}:${minutes}`;
}
