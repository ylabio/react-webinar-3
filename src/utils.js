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
 * Вывод массива страниц пагинации
 * @param page {Number}
 * @param lastPage {Number}
 * @returns {Array}
 */
export function pageResultNumber(page, lastPage) {
  const pagesList = [];
  if (page === 1) {
    pagesList.push(page + 1)
    pagesList.push(page + 2)
    pagesList.push('...')
    return pagesList
  }
  if (page === 2) {
    pagesList.push(page)
    pagesList.push(page + 1)
    pagesList.push('...')
    return pagesList
  }
  if (page === 3) {
    pagesList.push(page - 1)
    pagesList.push(page)
    pagesList.push(page + 1)
    pagesList.push('...')
    return pagesList
  }
  if (page > 3 && page < lastPage && page < lastPage - 1  && page < lastPage - 2) {
    pagesList.push('...')
    pagesList.push(page - 1)
    pagesList.push(page)
    pagesList.push(page + 1)
    pagesList.push('...')
    return pagesList
  }
  if (page === lastPage) {
    pagesList.push('...')
    pagesList.push(page - 2)
    pagesList.push(page - 1)
    return pagesList
  }
  if (page === lastPage - 1) {
    pagesList.push('...')
    pagesList.push(page - 1)
    pagesList.push(page)
    return pagesList
  }
  if (page === lastPage - 2) {
    pagesList.push('...')
    pagesList.push(page - 1)
    pagesList.push(page)
    pagesList.push(page + 1)
    return pagesList
  }
}