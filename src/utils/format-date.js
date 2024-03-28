function pad(number) {
  return number < 10 ? number='0' + number : number
}

const months = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${day} ${month} ${year} в ${hours}:${minutes}`;
}

