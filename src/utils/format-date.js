export function formatDate(date, t = () => { }) {
    const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const monthIndex = newDate.getMonth();
    const month = t(`${monthNames[monthIndex]}`);
    const day = newDate.getDate();
    const time = `${newDate.getHours()}:${newDate.getMinutes()}`

    return `${day} ${month} ${year} в ${time}`;
}