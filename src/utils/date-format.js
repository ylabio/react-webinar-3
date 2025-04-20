export default function DateFormat(toISOString, lang = 'ru') {
  const select = {
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const date = new Date(toISOString);
  const locale = lang === 'en' ? 'en-US' : 'ru-RU';
  const formatDate = date.toLocaleString(locale, select);

  return lang === 'ru' ? formatDate.replace(' г.', '') : formatDate;
}
