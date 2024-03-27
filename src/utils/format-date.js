export default function formatDate(isoDate, lang) {
  const ruMonths = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const enMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  switch (lang) {
    case "ru":
      return `${day} ${ruMonths[month]} ${year} в ${hours}:${minutes}`;
    case "en":
      return `${enMonths[month]} ${day}, ${year} at ${hours}:${minutes}`
    default:
      return `${day} ${ruMonths[month]} ${year} в ${hours}:${minutes}`
  }
}
