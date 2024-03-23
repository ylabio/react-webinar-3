export default function formatDate(fetchedDate, locale) {
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(fetchedDate).toLocaleDateString(locale, options);

  return date;
}
