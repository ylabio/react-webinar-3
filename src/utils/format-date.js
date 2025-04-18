export default function (isoString) {
  const date = new Date(isoString);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  // Локаль "ru-RU" для русского языка
  const formatted = new Intl.DateTimeFormat('ru-RU', options).format(date);

  // По умолчанию между датой и временем запятая, заменим на "в"
  return formatted.replace(',', ' в').replace('г.', '');
}
