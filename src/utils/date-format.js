export default function dataFormat(
  value,
  locale = "ru-RU",
  options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  }
) {
  const date = new Date(value);
  const formatter = new Intl.DateTimeFormat(locale, options);
  const formattedDate = formatter.format(date).replace(" г.", "");

  return formattedDate;
}
