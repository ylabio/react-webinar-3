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
 * @param locale {String}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Создание массива объектов количества страниц
 * @param firstItem {Number}
 * @param pages {Number}
 * @returns {Array}
 */
const generatePagesArray = (firstItem, pages) => {
  const arr = [];
  for (let i = firstItem; i < pages + 1; i++) {
    arr.push({ key: i - 1, page: i });
  }

  return arr;
};

/**
 * Создание массива актуальных страниц для пагинации
 * @param itemsPerPage {Number}
 * @param currentPage {Number}
 * @param itemsCount {Number}
 * @returns {Array}
 *
 */
export const getCurrentPaginationArray = (itemsPerPage, currentPage, itemsCount) => {
  const totalPages = Math.ceil(itemsCount / itemsPerPage);
  const leftDot = { key: 'l-dot', page: '...' };
  const rightDot = { key: 'r-dot', page: '...' };
  const firstPage = { key: 0, page: 1 };
  const lastPage = { key: totalPages - 1, page: totalPages };

  if (currentPage < 3) {
    return [firstPage, ...generatePagesArray(2, 3), rightDot, lastPage];
  }
  if (currentPage === 3) {
    return [firstPage, ...generatePagesArray(2, currentPage + 1), rightDot, lastPage];
  }

  if (currentPage === totalPages) {
    return [firstPage, leftDot, ...generatePagesArray(currentPage - 2, totalPages)];
  }

  if (currentPage > totalPages - 3) {
    return [firstPage, leftDot, ...generatePagesArray(currentPage - 1, totalPages)];
  }

  const middlePages = generatePagesArray(currentPage - 1, currentPage + 1);

  return [firstPage, leftDot, ...middlePages, rightDot, lastPage];
};
