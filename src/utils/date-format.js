const defaultOptins = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
};

/**
 * Функция, которая форматирует заданную дату на основе предоставленной локали и опций.
 *
 * @param {Date} date - Дата, которую нужно отформатировать.
 * @param {string} [locale="ru-RU"] - Локализация, используемая для форматирования. По умолчанию "ru-RU".
 * @param {Object} [options=defaultOptins] - Опции форматирования, которые нужно применить.
 * @return {string} Отформатированная дата в виде строки.
 */
export default function dateFormat(
  date,
  locale = "ru-RU",
  options = defaultOptins
) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}
