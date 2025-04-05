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

const getArray = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export function getFormatPages(totalPages, currentPage) {
  const minNumberOfPages = 6;
  if (totalPages <= minNumberOfPages) {
    return getArray(1, totalPages);
  }
  const leftStep = currentPage - 1;
  const rightStep = currentPage + 1;
  const leftEdge = Math.max(leftStep, 1);
  const rightEdge = Math.min(rightStep, totalPages);
  if (currentPage <= 3) {
    const left = 1;
    const right = currentPage === 1 ? currentPage + 2 : currentPage + 1;
    return [...getArray(left, right), "...", totalPages];
  }
  if (currentPage >= totalPages - 2) {
    const right = totalPages;
    const left = currentPage === totalPages ? currentPage - 2 : currentPage - 1;
    return [1, "...", ...getArray(left, right)];
  }
  return [1, "...", ...getArray(leftEdge, rightEdge), "...", totalPages];
};
