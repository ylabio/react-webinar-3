export default function formatCommentDate(date, lang = 'ru') {
  return new Intl.DateTimeFormat(lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
    .format(new Date(date))
    .replace('г. ', '');
}
