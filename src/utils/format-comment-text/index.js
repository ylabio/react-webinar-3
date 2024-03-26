/**
 * Форматирование текста, введённого пользователем
 * @param text {String} ввод пользователя
 * @param [max] {Number} максимальная длина слова(подстроки без пробелов) в результате
 * @returns {String} Отформатированный текст
 */
export default function formatCommentText(text, max = 50) {
  let string = text.trim();
  if (!string.length) return null;

  return string.split(' ').filter(Boolean).map(splitWord).join(' ');

  function splitWord(str) {
    if (str.length < max) return str;
    let rest = str;
    let chunks = [];
    while (rest.length) {
      chunks.push(rest.slice(0, max));
      rest = rest.slice(max);
    }
    return chunks.join(' ');
  }
}
