import {useServiceTranslate} from "../hooks/use-translate";

export const parseDate = (dateString) => {
  const date = new Date(dateString);

  const monthsRu = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];

  const monthsEn = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  console.log(useServiceTranslate().locale)
  const months = useServiceTranslate().locale === 'ru' ? monthsRu: monthsEn

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day} ${months[monthIndex]} ${year} ${useServiceTranslate().locale === 'ru' ? 'в' : 'at'} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`

  return formattedDate
}