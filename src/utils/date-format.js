/**
 * Форматирование даты
 * @param value {String}
 * @param options {Object}
 * @returns {String}
 */
export default function dateFormat(value, locale = 'ru-RU', options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}) {
  const date = new Date(value)
  const result = new Intl.DateTimeFormat(locale, options).format(date);
  return result.replace(/г\./, '');
}