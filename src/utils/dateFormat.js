/**
 * Форматирование даты
 * @param value {String}
 * @param optionsDate {Object}
 * @param optionsTime {Object}
 * @returns {String}
 */
export default function dateFormat(value, locale = 'ru-RU', 
  optionsDate = {
    year: "numeric",
      month: 'long',
      day: 'numeric'
  },
  optionsTime = {
    hour: 'numeric',
    minute: 'numeric'
  }
) {
  const date = new Date(value)
  const result =  new Intl.DateTimeFormat(locale, optionsDate).format(date)
  .slice(0, -2) + 'в ' + 
  new Intl.DateTimeFormat(locale, optionsTime).format(date);

  return result;
}
