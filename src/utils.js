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

export function paginationBuilder(currentPage, itemsTotal, pageSize = 10) {
  const pagesTotal = Math.ceil(itemsTotal / pageSize);
  const btnLayout = [];

  if (pagesTotal <= 4) {
    for (let i = 1; i <= pagesTotal; i++) {
      btnLayout.push(i);
    }
  } else {
    switch (currentPage) {
      case 1:
      case 2:
        btnLayout.push(1, 2, 3, "...", pagesTotal);
        break;

      case 3:
        btnLayout.push(1, 2, 3, 4, "...", pagesTotal);
        break;

      case pagesTotal:
      case pagesTotal - 1:
        btnLayout.push(1, "...", pagesTotal - 2, pagesTotal - 1, pagesTotal);
        break;

      case pagesTotal - 2:
        btnLayout.push(
          1,
          "...",
          pagesTotal - 3,
          pagesTotal - 2,
          pagesTotal - 1,
          pagesTotal
        );
        break;

      default:
        btnLayout.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          pagesTotal
        );
    }
  }

  return btnLayout;
}
