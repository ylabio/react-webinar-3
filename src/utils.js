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
 * получение массива страниц для пагинации
 * @param totalArticlesCount {Number}
 * @param limit {Number}
 * @param currentPage {Number}
 * @returns {Array}
 */
export function getArrPages(totalArticlesCount, limit, currentPage) {
  let pagesCount = Math.ceil(totalArticlesCount / limit)

  switch (currentPage) {
    case 1:
    case 2:
      return [1, 2, 3, '...', pagesCount]

    case 3:
      return [1, 2, 3, 4, '...', pagesCount]

    case pagesCount - 2:
      return [1, '...', pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]

    case pagesCount:
    case pagesCount - 1:
      return [1, '...', pagesCount - 2, pagesCount - 1, pagesCount]

    default:
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pagesCount]
  }

}
