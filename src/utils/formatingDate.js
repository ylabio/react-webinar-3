export default function formatingDate(date) {
  const newDate = new Date(date)
  const formatedDate = new Intl.DateTimeFormat('ru', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(newDate);
  return formatedDate
}