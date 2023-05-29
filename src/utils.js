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
 * Возвращает массив страниц для пагинации
 * можно сразу обернуть в useMemo и поместить в хуки??
 * @param totalPages {Number}
 * @param page {Number}
 * @returns {Array}
 */

export function getPagesArray(totalPages, page){
  const pages = [];

  // определение соседних со стартовой страницей, которые будут отрисовываться
  // в пагинации, чтобы были  меньше и больше на 1 от стартовой,
  // а также не могли быть меньше 1 и больше общего количества страниц
  let startPage = Math.max(1, page - 1);
  let endPage = Math.min(totalPages, page + 1);

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2 && totalPages > 4) {
      pages.push("...");
    }
  }
// случай когда стартовая страница последняя и по аналогии
// должна быть пагинация на две страницы назад
  if (page === totalPages && totalPages > 3) {
    pages.push(totalPages - 2);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

// случай когда начальная страница 1 и д.б. пагинация на 3
  if (page === 1 && totalPages > 3) {
    pages.push(3);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1 && totalPages > 4) {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  return pages;
};