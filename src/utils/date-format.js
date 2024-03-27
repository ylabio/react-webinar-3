export default function formatDate(dateStr, t) {
    const date = new Date(dateStr);
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const monthKey = 'commentMonth.' + monthNames[date.getMonth()];
    const month = t(monthKey);
    return `${date.getDate()} ${month} ${date.getFullYear()} ${t("at")} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
}
