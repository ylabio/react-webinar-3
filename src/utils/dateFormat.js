export function dateFormat(date, locale = "ru") {
  let options = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
  };
  return Intl.DateTimeFormat(locale, options).format(new Date(date));
}
