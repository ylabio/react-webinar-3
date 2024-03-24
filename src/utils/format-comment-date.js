export default function formatCommentDate(dateString, lang) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = date.toLocaleDateString(lang, options);
  return formattedDate;
}