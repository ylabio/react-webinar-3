/**
 * Форматирование даты
 * @param date {String}
 * @returns {String}
 */
export default function FormattedDate(date) {

  let dateObj = new Date(date);

  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const formatDate = {
    date: dateObj.getDate(),
    month: months[dateObj.getMonth()],
    year: dateObj.getFullYear(),
    hours: dateObj.getHours(),
    minutes: dateObj.getMinutes(),
    timezoneOffset: dateObj.getTimezoneOffset(),
    getFullDate: function () {
      return `${this.date} ${this.month} ${this.year} в ${this.hours}:${this.minutes < 10 ? '0' + this.minutes : this.minutes}`
    }
  };
  
  return formatDate.getFullDate();

}
