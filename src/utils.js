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
 * @param locale {String}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Форматирование цены товара
 * возвращает цену товара с разделением на разряды и обозначением валюты
 * @param value {Number} Цена товара
 * @param currency {String} Код валюты
 * @param [locale] {String} Локаль (код языка)
 * @returns {string}
 */
export function priceFormatter(value, currency = 'RUB', locale = 'ru-RU') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(value);
}

export function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, idx) => idx + start);
}

export default function getPages({ totalPages, currentPage, separator }) {
  const ITEMS_NUMBER = 7;
  if (ITEMS_NUMBER >= totalPages) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(currentPage - 1, 1);
  const rightSibling = Math.min(currentPage + 1, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const lastItem = currentPage === 1 ? rightSibling + 1 : rightSibling;
    return [...range(1, lastItem), separator, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const firstItem =
      currentPage === totalPages ? leftSibling - 1 : leftSibling;
    return [1, separator, ...range(firstItem, totalPages)];
  }

  if (showLeftDots && showRightDots) {
    return [
      1,
      separator,
      ...range(leftSibling, rightSibling),
      separator,
      totalPages,
    ];
  }
}
