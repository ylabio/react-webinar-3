import * as translations from './translations';

/**
 * Перевод фразу по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода
 * @param [plural] {Number} Число для плюрализации
 * @returns {String} Переведенный текст
 */
export default function translate(lang, text, plural) {
  let result = translations[lang]?.[text] ?? text;

  if (typeof plural !== 'undefined') {
    const key = new Intl.PluralRules(lang).select(plural);
    result = result[key] ?? text;
  }

  return result;
}
