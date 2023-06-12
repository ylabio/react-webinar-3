export function formatDateString(dateString, locale = 'ru-RU') {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };

  const monthNames = new Intl.DateTimeFormat(locale, { month: 'long' }).formatToParts();

  const currentMonthName = monthNames.find(part => part.type === 'month')?.value || '';

  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex]?.value || '';

  return date.toLocaleDateString(locale, options).replace(currentMonthName, monthName);
}
