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
 * Формирование массива элементов пагинации
 * @param activePage {Number}
 * @param pagesCount {Number}
 * @returns {Array}
 */

export function getPaginationItems(activePage, pagesCount) {
  if (pagesCount < 6)
    return Array(pagesCount)
      .fill()
      .map((_, i) => i + 1);
  if (activePage < 4) return [1, 2, 3, 4, 'points', pagesCount];
  if (pagesCount - activePage < 3)
    return [
      1,
      'points',
      pagesCount - 3,
      pagesCount - 2,
      pagesCount - 1,
      pagesCount,
    ];
  const prev = activePage - 1;
  const next = activePage + 1;

  return [1, 'points', prev, activePage, next, 'points', pagesCount];
}
