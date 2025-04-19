import useTranslate from '../hooks/use-translate';

export default function formatISODateToCustomString(isoString) {
  const date = new Date(isoString);
  const { t } = useTranslate();

  if (isNaN(date.getTime())) {
    throw new Error('Некорректная дата в ISO формате');
  }

  const day = date.getDate();
  const months = [
    t('date.january'),
    t('date.february'),
    t('date.march'),
    t('date.april'),
    t('date.may'),
    t('date.june'),
    t("date.july"),
    t("date.august"),
    t("date.september"),
    t("date.october"),
    t("date.november"),
    t("date.december"),
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year} ${t('date.at')} ${hours}:${minutes}`;
}
