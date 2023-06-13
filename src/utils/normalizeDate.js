export function normalizeDate(date, locale, hour12 = false) {
  const monthsList = [
    "months.January",
    "months.February",
    "months.March",
    "months.April",
    "months.May",
    "months.June",
    "months.July",
    "months.August",
    "months.September",
    "months.October",
    "months.November",
    "months.December",
  ];
  
  let dateObj = new Date(date),
      day = dateObj.getDate(),
      month = monthsList[dateObj.getMonth()],
      year = dateObj.getFullYear(),
      time = dateObj.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', hour12 })
  
  return {day, month, year, time}
}