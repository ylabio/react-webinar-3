/**
 * Утилита для проверки текста на пустоту (на то, что она не состоит из одних пробелов)
 * @param text {String}
 * @return {Boolean} (true - строка  пустая, false - строка не пустая)
 */
export default function checkWhitespaceForm (text) {
  
  const result = /\S/.test(text);

  return !result;
}
