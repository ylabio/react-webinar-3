import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export default function formatDate (date) {
  return format(date, "d MMMM yyyy 'в' HH:mm", { locale: ruLocale })
}