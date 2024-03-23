/**
 * Форматирование даты
 * @param value {String}
 * @param options {Object}
 * @returns {String}
 */
export default function dateFormat(value, locale = 'ru-RU', options = {}) {
  const date = new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(date);
}
