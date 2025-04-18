/**
 * Форматирование даты
 * @param date {String}
 * @param options {Object}
 * @param locale {String}
 * @returns {String}
 */
export function formatDate(date, options, locale = 'ru-RU') {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

