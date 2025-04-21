export function formatDate(dateString,monthNames, inLang) {
  
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${day} ${monthNames[month]} ${year} ${inLang} ${hours}:${minutes}`;
  };