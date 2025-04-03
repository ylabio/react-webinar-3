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
 * @param itemCount {Number}
 * @param itemOnPage {Number}
 * @returns {Array}
 */
export const generatePagesArray = (itemCount, itemOnPage = 10) => {
  const pages = Math.ceil(itemCount / itemOnPage);
  return Array.from({ length: pages }, (_, i) => ({
    key: i,
    page: i + 1,
  }));
};

/**
 * Создание массива актуальных страниц для пагинации
 * @param pageArr {Array}
 * @param viewPageNumber {Number}
 * @returns {Array}
 *
 */
export const getCurrentPaginationArray = (pageArr, viewPageNumber) => {
  const leftDot = { key: 'l-dot', page: '...' };
  const rightDot = { key: 'r-dot', page: '...' };
  const firstPage = pageArr.slice(0, 1);
  const lastPage = pageArr.slice(-1);
  const arrayLength = pageArr.length;

  if (arrayLength < 6) return pageArr;
  if (arrayLength === 1) return [];

  if (viewPageNumber < 3) {
    let numSlice = 3;
    if (viewPageNumber === 2) numSlice = 4;

    return [...pageArr.slice(0, numSlice), rightDot, ...lastPage];
  }
  if (viewPageNumber > arrayLength - 4) {
    let numSlice = -3;
    if (viewPageNumber === arrayLength - 3) numSlice = -4;

    return [...firstPage, leftDot, ...pageArr.slice(numSlice)];
  }

  const middlePage = pageArr.slice(viewPageNumber - 1, viewPageNumber + 2);

  return [...firstPage, leftDot, ...middlePage, rightDot, ...lastPage];
};
