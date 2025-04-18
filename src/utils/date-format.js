/**
 * @returns {str}
 */
export default function formatDate(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}
