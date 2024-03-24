function dateFormat(date, locale = "ru-Ru") {
  const formattedDate = new Date(date);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return formattedDate.toLocaleString(locale, options).replace(" г.", "");
}

export default dateFormat;