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

/**
 * Форматирование даты в формат необходимый для комментариев
 * @param date {String}
 * @returns {String} пример возвращаемой строки: 16 апреля 2025 в 01:39
 */
export function formatDateForComments(date) {
  return formatDate(date, {
    dateStyle: 'long',
    timeStyle: 'short',
  }).replace('г.', '');
}
