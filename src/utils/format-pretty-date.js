/**
 * Форматирование даты в читаемый вид
 * Преобразует строку даты в формат вида "12 апреля 2025 в 14:30" с учётом указанной локали
 * @param dateString {String} Строка даты в формате, распознаваемом конструктором Date.
 * @param [locale] {String} Локаль (код языка), по умолчанию 'ru-RU'.
 * @returns {String} Отформатированная строка даты.
 * @example formatPrettyDate('2025-04-12T14:30:00') // "12 апреля 2025 в 14:30"
 */
export function formatPrettyDate(dateString, locale = 'ru-RU') {
  const date = new Date(dateString);

  const datePart = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${datePart} в ${hours}:${minutes}`;
}
