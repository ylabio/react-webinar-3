import dayjs from 'dayjs'
import 'dayjs/locale/ru'

export function formatDate(date) {
  try {
    dayjs.locale("ru");
    const currentDate = date.split("T");
    return `${dayjs(currentDate[0]).format("DD MMMM YYYY г.")} в ${currentDate[1].slice(0, 5)}`;
  } catch (e) {
    return "";
  }
}