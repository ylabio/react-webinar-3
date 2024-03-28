function formattedDate(date, lang = "ru-Ru") {
  let formatted = new Date(date);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return formatted.toLocaleString(lang, options).replace(" г.", "");
}

export default formattedDate;
