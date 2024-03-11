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

export const createPageList = (totalPage) => {
  let pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  return pages;
};

export const createPagination = (pages, currentPage, setArrCurrBtn) => {
  let tempNumberPage = [...pages];
  let dots = "...";

  if (currentPage >= 1 && currentPage <= 2) {
    tempNumberPage = [1, 2, 3, dots, pages.length];
  } else if (currentPage === 3) {
    const sliced = pages.slice(0, 4);
    tempNumberPage = [...sliced, dots, pages.length];
  } else if (currentPage > 3 && currentPage < pages.length - 2) {
    const slicedLeft = pages.slice(currentPage - 2, currentPage);
    const slicedRight = pages.slice(currentPage, currentPage + 1);
    tempNumberPage = [
      1,
      dots,
      ...slicedLeft,
      ...slicedRight,
      dots,
      pages.length,
    ];
  } else if (currentPage > pages.length - 3) {
    const sliced = pages.slice(pages.length - 4);
    tempNumberPage = [1, dots, ...sliced];
  }
  setArrCurrBtn(tempNumberPage);
};
