export const parseDate = (dateString) => {
  const date = new Date(dateString);

  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day} ${months[monthIndex]} ${year} в ${hours}:${minutes < 10 ? '0' : ''}${minutes}`

  return formattedDate
}