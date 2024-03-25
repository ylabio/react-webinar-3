/**
 * Форматирование даты
 * @returns {Array}
 */
export default function datesFormat(arr) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  return arr.map((item) => {
    const date = new Date(item.dateCreate).toLocaleString('ru-RU', options);
    item.dateCreate = date;
    return item;
  })
}
