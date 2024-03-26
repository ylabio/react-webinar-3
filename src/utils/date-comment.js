export default function formatCommentDate(
  dateString,
  locale = "ru-RU",
  options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
) {
  const date = new Date(dateString);
  let formattedDate = date.toLocaleDateString(locale, options);

  // Для русской локали меняем первую запятую на " в", для других локалей можно добавить аналогичные условия
  if (locale === "ru-RU") {
    formattedDate = formattedDate.replace(",", " в");
  }

  return formattedDate;
}
