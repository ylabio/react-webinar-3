export function handleDate(dateCreate) {
  const dateString = dateCreate;
  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('ru-RU', options);

  return formattedDate;
}