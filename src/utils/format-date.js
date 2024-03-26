export default function dateFormat(value, locale = 'ru-Ru') {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "2-digit",
    minute: "2-digit"
  }
  const date = new Date(value);

  return new Intl.DateTimeFormat(locale, options).format(date).replace(/\s*г\./, '');
}