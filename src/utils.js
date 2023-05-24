/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
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
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export const formatPrice = (price) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

export const range = (start, end) =>
  new Array(end - start + 1).fill("").map((_, i) => i + start);

export const generatePages = (totalPages, currentPage) => {
  if (totalPages <= 3) {
    return range(1, totalPages);
  }
  const left = Math.max(currentPage - 1, 1);
  const right = Math.min(currentPage + 1, totalPages);
  const leftDots = left >= 3;
  const rightDots = right < totalPages - 1;
  if (leftDots && rightDots) {
    return [1, "...", ...range(left, right), "...", totalPages];
  }
  if (leftDots && !rightDots) {
    return [1, "...", ...range(left, totalPages)];
  }
  if (!leftDots && rightDots) {
    return [...range(1, right), "...", totalPages];
  }
};
