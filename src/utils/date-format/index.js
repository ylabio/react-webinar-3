/**
 * Форматирование даты в строку с русскоязычным представлением
 * @param dateStr {String} Строка даты в формате ISO 8601 (например, "2025-04-15T22:39:32.013Z")
 * @returns {String} Дата в формате "15 апреля 2025 в 22:39" (день месяц_в_родительном_падеже год в ЧЧ:ММ)
 */
export default function dataFormate(dateStr) {
  const date = new Date(dateStr);

  const months = {
    'январь': 'января',
    'февраль': 'февраля',
    'март': 'марта',
    'апрель': 'апреля',
    'май': 'мая',
    'июнь': 'июня',
    'июль': 'июля',
    'август': 'августа',
    'сентябрь': 'сентября',
    'октябрь': 'октября',
    'ноябрь': 'ноября',
    'декабрь': 'декабря',
  };

  const day = date.getDate();
  const month = date.toLocaleString('ru-RU', { month: 'long' });
  const monthGenitive = months[month] || month;
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${day} ${monthGenitive} ${year} в ${hours}:${minutes}`;

  return formattedDate;
}