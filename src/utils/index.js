import {russianWords, englishWords} from "./translation-words.js"

/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Переводчик слов
 * @param word {String}
 * @returns {String}
 */
export function translateWord(word, language = 'ru-RU') {
  //Если установлен английский язык, то ищем индекс слова в массиве русских слов
  if (language === "en-US") {
    const wordIndex = russianWords.indexOf(word);
    //Возвращаем слово по индексу из массива английских слов
    if (wordIndex !== -1) return englishWords[wordIndex];
    //Если слова нет в массиве переводимых слов, то возвращаем русское слово
    return word;
  };
  //Если установлен русский язык, то возвращаем то же слово
  return word;
}