export default function (isoString, locale = 'ru') {
  const date = new Date(isoString);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatted = new Intl.DateTimeFormat(locale, options).format(date);

  return locale === 'ru'
    ? formatted.replace('г.', '')
    : formatted.replace(',', '')
    ;
}

//.replace(',', ' в').replace('г.', '')
