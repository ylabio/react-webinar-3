export const dateFormat = (dateString, locale) => {

  const date = new Date(dateString);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };

  return date.toLocaleString(locale, options).replace('г.', '');
}
