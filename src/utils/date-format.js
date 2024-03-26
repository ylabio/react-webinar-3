/**
 * Форматирование даты
 * @param date
 * @returns {`${number} ${string} ${number} в ${string}`}
 */
export default function dateFormat(date) {
  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа",
    "сентября", "октября", "ноября", "декабря"];

  const currentDate = new Date(date);
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const time = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

  return `${day} ${month} ${year} в ${time}`
}