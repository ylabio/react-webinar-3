
export default function dateFormat(value, locale = 'ru-RU') {
    let arr = {
        0:  "января",
        1: "февраля",
        2: "марта",
        3: "апреля",
        4: "мая",
        5: "июня",
        6: "июля",
        7: "августа",
        8: "сентября",
        9: "октября",
        10: "ноября",
        11: "декабря",
    };
    const date = new Date(value);
    const day = date.toLocaleString(locale, {
        day: 'numeric'
    });
    const month = date.getMonth();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("ru",  {
        hour: 'numeric',
        minute: 'numeric'
    })
    return `${day} ${arr[month]} ${year} в ${time}`;
}