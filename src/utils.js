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

export function generatePagination(currentPage, articles, limit) {

  let totalPages = Math.floor(articles / limit);
  if (articles % limit !== 0) {
    totalPages++;
  }
  let delta = 1;
  //для отображения дополнительной страницы по краям
  let extra = 0;
  if ((currentPage === 1) || (currentPage === totalPages)) extra = 1;
  let range = [];

  for (
    let i = Math.max(2, currentPage - delta - extra);
    i <= Math.min(totalPages - 1, currentPage + delta + extra);
    i++
  ) {
    range.push(i);
  }
  if (currentPage - delta - extra > 2) {
    range.unshift("blank");
  }
  if (currentPage + delta + extra < totalPages - 1) {
    range.push("blank");
  }

  range.unshift(1);
  if (totalPages !== 1) range.push(totalPages);

  return range;
}
