export function formatDate(dateString) {
  const date = new Date(dateString);

  const datePart = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const timePart = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return `${datePart} в ${timePart}`;
}
