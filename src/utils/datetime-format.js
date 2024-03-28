

export default function dateTimeFormat(value, locale = 'ru-RU',
 options = {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'}){
  return new Date(value).toLocaleDateString(locale, options);
}