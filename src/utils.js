import {DOTS} from "./constants";

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

export function getArrayByRange(start, end) {
  const length = end - start + 1;
  return [...Array(length).keys()].map(value => value + start);
}

export function isArrayEmpty(arr) {
  if (!Array.isArray(arr)) return false;

  return arr.length === 0
}

export function getPaginationRange({total, limit, currentPage}) {
  const totalPageCount = Math.ceil(total / limit);

  let range;

  if (totalPageCount <= 4) {
    range = getArrayByRange(1, totalPageCount);
  } else if (currentPage < 3) {
    let leftRange = getArrayByRange(1, 3);
    range = [...leftRange, DOTS, totalPageCount];
  } else if (currentPage < 4) {
    let leftRange = getArrayByRange(1, 4);
    range = [...leftRange, DOTS, totalPageCount];
  } else if (currentPage === totalPageCount || currentPage === totalPageCount - 1) {
    let rightRange = getArrayByRange(totalPageCount - 3, totalPageCount);
    range = [1, DOTS, ...rightRange];
  } else {
    const leftSiblingIndex = currentPage - 1;
    const rightSiblingIndex = currentPage + 1;

    range = [1, DOTS, leftSiblingIndex, currentPage, rightSiblingIndex, DOTS, totalPageCount];
  }

  return range;
}