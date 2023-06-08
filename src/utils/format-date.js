export default (rawDate, locales) => {
  const date = new Date(rawDate);
  const dateFormatter = new Intl.DateTimeFormat(locales, {
    month: "long",
    day: "numeric",
  });
  const year = date.getFullYear();
  const timeFormatter = new Intl.DateTimeFormat(locales, {
    hour: "numeric",
    minute: "numeric",
  });

  return locales == "ru"
    ? `${dateFormatter.format(date)} ${year} в ${timeFormatter.format(date)}`
    : `${dateFormatter.format(date)} ${year} ${timeFormatter.format(date)}`;
};
