import * as translations from './translations';

/**
 * Перевод фразу по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода
 * @param pluralCount
 * @returns {String} Переведенный текст
 */
export default function translate(lang, text, pluralCount) {
  const translation = translations[lang]?.[text];

  if (typeof translation === 'object' && pluralCount !== undefined) {
    const key = new Intl.PluralRules(lang).select(pluralCount);
    return translation[key] || Object.values(translation)[0] || text;
  }

  if (typeof translation === 'string') {
    return translation;
  }

  return text;
}
