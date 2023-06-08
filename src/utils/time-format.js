export const dateFormat = (date, locale = 'ru-RU') => {
  const cDate = new Date(date);

  const day = cDate.toLocaleString(locale, {
    day: '2-digit',
  });

  const month = cDate.toLocaleString(locale, {
    month: 'long',
  });

  const time = cDate.toLocaleTimeString('ru', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${day} ${month} ${cDate.getFullYear()} в ${time}`;
};
