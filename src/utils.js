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

export function paginator(current, total) {
  if (total < 6) {
    const res = [];

    for (let i = 0; i < total; i++) {
      res[i] = i + 1;
    }

    return res;
  }

  switch (current) {
    case 1:
    case 2:
      return [1, 2, 3, "...", total];
      break;
    case 3:
      return [1, 2, 3, 4, "...", total];
      break;
    case total - 2:
      return [1, "...", total - 3, total - 2, total - 1, total];
      break;
    case total - 1:
    case total:
      return [1, "...", total - 2, total - 1, total];
      break;

    default:
      return [1, "...", current - 1, current, current + 1, "...", total];
  }
}
