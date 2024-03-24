export default function formatCommentDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = date.toLocaleDateString('ru-RU', options);
  return formattedDate.replace(',', ' в');
}