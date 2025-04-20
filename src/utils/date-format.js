export default function formatDate(dateString) {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  });
  return formatter.format(new Date(dateString)).replace(',', ' в');
}