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

export function getPages(page, count, limit) {
  count = Math.ceil(count/limit) - 1;
if ( page === 1 || page === 2) {
  return [1, 2, 3, "...", count];
} else if ( page === 3 ) {
  return [1, 2, 3, 4, "...", count];
} else if ( page > 3 && page < count - 2 ) {
  return [1, "...", page - 1, page, page + 1, "...", count]
} else if ( page === count - 2 ) {
  return [1, "...", count - 3, count - 2, count - 1, count]
} else if ( page === count - 1 || page === count )
{
  return [1, "...", count - 2, count - 1, count]
}
}
