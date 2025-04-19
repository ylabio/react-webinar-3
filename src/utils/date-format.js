/**
 * Форматирование даты
 * @param value {String}
 * @param locale {String}
 * @returns {String}
 */
export default function dateFormat(value, locale = 'ru-RU') {
    const date = new Date(value);
    const dateFormatter = new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        yearh: 'numeric'
    });

    const timeFormatter = new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return `${dateFormatter.format(date)} в ${timeFormatter.format(date)}`;
  }
  