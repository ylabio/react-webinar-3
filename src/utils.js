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
 * Формирует пагинацию
 */
export const DOTS = '...';

export function getPaginationButtons(currentPage, pagesCount) {
  let pagesArr = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesArr.push(i);
  }

  if (currentPage <= 2) {
    pagesArr = [1, 2, 3, DOTS, pagesCount];
  } else if (currentPage === 3) {
    const sliced = pagesArr.slice(0, 4);
    pagesArr = [...sliced, DOTS, pagesCount];
  } else if (currentPage > 3 && currentPage < pagesCount - 2) {
    const slicedLeft = pagesArr.slice(currentPage - 2, currentPage);
    const slicedRight = pagesArr.slice(currentPage, currentPage + 1);
    pagesArr = [
      1,
      DOTS,
      ...slicedLeft,
      ...slicedRight,
      DOTS,
      pagesCount,
    ];
  } else if (currentPage > pagesCount - 3) {
    const sliced = pagesArr.slice(pagesCount - 4);
    pagesArr = [1, DOTS, ...sliced];
  }
  return pagesArr;
}
