/**
 * Форматирование даты
 * @param {string} dateString
 * @param {string} [locale='ru-RU']
 * @returns {string}
 */
export default function dateFormat(dateString, locale = 'ru-RU') {
  const date = new Date(dateString);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return date.toLocaleDateString(locale, options);
}
