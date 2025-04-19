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

  const day = date.getDate();
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year} в ${hours}:${minutes}`;
}
