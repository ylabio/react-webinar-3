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
 * Принимает номер текущей и последней страницы
 * Возвращает массив из чисел (номера страниц) для пагинации
 * Положительные числа - номера страниц, отрицательные числа - знак '...'
 * @param currentPage {Number}
 * @param lastPage {Number}
 * @returns {array}
 */
export function getPaginationPages(currentPage, lastPage) {
  let pages = [];

  if (lastPage <= 5) {
    for (let i = 0; i < lastPage; i++) {
      pages[i] = i + 1;
    }
    return pages;
  } else if (currentPage === 1) {
    pages = [1, 2, 3, -1, lastPage];
    return pages;
  } else if (currentPage === 2 || currentPage === 3) {
    pages = new Set([1, 2, 3, currentPage + 1, -1, lastPage]);
    return Array.from(pages);
  } else if (currentPage === lastPage) {
    pages = [1, -1, currentPage - 2, currentPage - 1, currentPage];
    return pages;
  }

  pages = [1, -1, currentPage - 1, currentPage, currentPage + 1];
  if (lastPage > currentPage + 2) {
    pages.push(-2);
  }
  pages.push(lastPage);
  pages = new Set(pages);
  return Array.from(pages);
}
