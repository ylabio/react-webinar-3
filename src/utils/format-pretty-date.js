/**
 * Форматирование даты в читаемый вид
 * Преобразует строку даты в формат вида "12 апреля 2025 в 14:30" с учётом указанной локали
 * @param dateString {String} Строка даты в формате, распознаваемом конструктором Date.
 * @param [locale] {String} Локаль (код языка), по умолчанию 'ru'.
 * @returns {String} Отформатированная строка даты.
 * @example formatPrettyDate('2025-04-12T14:30:00') // "12 апреля 2025 в 14:30"
 */
export function formatPrettyDate(dateString, locale = 'ru') {
  const date = new Date(dateString);

  const incorrectLiteral = 'г. в';
  const correctLiteral = ' в ';
  const formatter = {
    dateStyle: "long",
    timeStyle: "short",
  };

  const datePart = new Intl.DateTimeFormat(locale, formatter).formatToParts(date);

  const customDate = datePart.reduce((dateString, part) => {
    // Пропускаем литерал, если это "г." (обязательно с trim что бы удалить все виды пробелов)
    if (part.type === 'literal' && part.value.trim() === incorrectLiteral) {
      return dateString + correctLiteral;
    }
    return dateString + part.value;
  }, '');

  return customDate;
}
