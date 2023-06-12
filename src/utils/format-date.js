/**
 * Форматирование разрядов числа
 * @param value {Date}
 * @param options {Object}
 * @returns {String}
 */
export default function dateFormat(value, locale = 'ru-RU', options = {month:'long', day:'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'}) {
    const date = new Date(value);
    const result =  date.toLocaleTimeString([], options);
    return result.replace('г. ', '');
}