export default function dateFormat(dateStr) {
  const date = new Date(dateStr);

  const optionsDate = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const formattedDate = date.toLocaleString('ru-RU', optionsDate);
  const formattedTime = date.toLocaleString('ru-RU', optionsTime);

  return `${formattedDate.replace(' г.', '')} в ${formattedTime}`;
}