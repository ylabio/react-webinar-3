/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
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
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export default function constructPageArray(pagesCount, currentPage) {
  const pagesArray = [];

  for (let i = 1; i <= pagesCount; i++) {
    if (i === 1 || i === pagesCount || i === currentPage) {
      pagesArray.push(i);
      continue;
    }

    if (currentPage >= 4 && i === 2) {
      pagesArray.push("...");
    }

    if (
      (currentPage > 1 || currentPage < pagesCount) &&
      (i === currentPage - 1 || i === currentPage + 1)
    ) {
      pagesArray.push(i);
      continue;
    }

    if (
      (i < 4 && currentPage < 4) ||
      (i > pagesCount - 2 && currentPage > pagesCount - 2)
    ) {
      pagesArray.push(i);
    }

    if (
      i === pagesCount - 1 &&
      currentPage !== pagesCount - 1 &&
      currentPage <= pagesCount - 2
    ) {
      pagesArray.push("...");
    }
  }

  return pagesArray;
}
