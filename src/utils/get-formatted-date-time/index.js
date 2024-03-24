export default function getFormattedDateTime(date_time) {
    const date = new Date(date_time);
    const formattedDate = date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
    });
    
    return `${formattedDate} в ${formattedTime}`
  }
  