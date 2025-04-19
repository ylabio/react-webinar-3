// Форматирует дату в удобочитаемый вид

export default function formatDate(dateString) {
    const date = new Date(dateString);

    const optionsDate = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
    };

    const formattedDate = new Intl.DateTimeFormat('ru-RU', optionsDate).format(date).replace(' г.', '');
    const formattedTime = new Intl.DateTimeFormat('ru-RU', optionsTime).format(date);

    return `${formattedDate} в ${formattedTime}`;
}
