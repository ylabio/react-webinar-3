import moment from 'moment';
import useTranslate from "../hooks/use-translate";

export function formatDateTime(dateTime) {
  const {t} = useTranslate();
  moment.locale(t('date.locale'));
  return moment(dateTime).format('D MMMM YYYY [в] HH:mm');
}
