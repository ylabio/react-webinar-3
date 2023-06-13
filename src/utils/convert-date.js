export function convertDate(date) {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    };
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleString("ru-RU", options);
    return formattedDate;
}