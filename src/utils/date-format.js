/**
 * Функция форматирования даты
 * @param {String} date
 * @return {String}
 */
export function dateFormat(date) {
  const months = {
    1: 'января', 2: 'февраля', 3: 'марта', 4: 'апреля',
    5: 'мая', 6: 'июня', 7: 'июля', 8: 'августа', 9: 'сентября',
    10: 'октября', 11: 'ноября', 12: 'декабря'
  }

  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes();

  return `${formattedDay} ${months[month]} ${year} в ${hours}:${minutes}`;
}