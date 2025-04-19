/**
 * Форматирует строку даты в читаемый вид на русском языке.
 * @param {string | number | Date} input - Исходная дата.
 * @returns {string}
 */
export default function formatDate(input) {
  const parsedDate = new Date(input);

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formatter.format(parsedDate);
}
