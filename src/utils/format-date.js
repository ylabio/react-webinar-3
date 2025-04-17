export function formatDate(date) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const month = months[newDate.getMonth()];
    const day = newDate.getDay();
    const time = `${newDate.getHours()}:${newDate.getMinutes()}`

    return `${day} ${month} ${year} в ${time}`;
}