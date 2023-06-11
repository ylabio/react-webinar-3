export default function formatDate(dateString, locale) {
  const date = new Date(dateString);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  const formattedDate = date.toLocaleDateString(locale, options);
  const trimmedDate = formattedDate.replace('г.', '');

  return trimmedDate;
}
