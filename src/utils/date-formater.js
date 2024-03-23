export default function dateFormater(date, locale) {
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const result = new Date(date).toLocaleDateString(locale, options).replace(/\s*г\./, "");

  return result;
}