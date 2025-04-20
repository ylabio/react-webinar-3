/**
 * Форматирует дату в виде: "12 марта 2025 в 14:30"
 *
 * @param {string} isoDate - Дата в формате ISO (например, '2025-04-19T14:30:00.000Z')
 * @param {string} [locale='ru-RU'] - Локаль для отображения месяца
 * @returns {string} Отформатированная строка даты
 */
export default function formatDate(isoDate, locale = 'ru-RU') {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  const datePart = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date).slice(0, -2); // автоматом в родительном падеже, без "г."

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${datePart} в ${hours}:${minutes}`;
}
