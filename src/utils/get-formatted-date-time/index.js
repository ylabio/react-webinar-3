  export default function getFormattedDateTime(date_time) {
      const date = new Date(date_time);
      const formattedDate = date.toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric'
      });
      const year = date.getFullYear();
      const formattedTime = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
      });
      
      return `${formattedDate} ${year} в ${formattedTime}`
    }
    