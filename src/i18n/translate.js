import * as translations from './translations';

/**
 * Перевод фразу по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода
 * @param [plural] {Number} Число для плюрализации
 * @returns {String} Переведенный текст
 */
export default function translate(lang, text, plural) { // Получаем код языка, текст, число
  let result = translations[lang] && (text in translations[lang])  
    ? translations[lang][text] // Если текст есть в базе - переводим
    : text; // Если нет - оставляем

  if (typeof plural !== 'undefined') { // Если число есть
    const key = new Intl.PluralRules(lang).select(plural); // переводим с учетом кода языка
    if (key in result) {
      result = result[key];
    }
  }

  return result;
}
