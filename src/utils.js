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

export function renderPageNumbers(currentPage, totalPages, onChange) {
  let pageNumbers = [];
  if (totalPages > 0 && totalPages < 6) {
    for (let i = 1; i < totalPages + 1; i++) {
      pageNumbers.push(i)
    }
  } if (totalPages > 5) {
    if (currentPage < 4) pageNumbers = [1, 2, 3, '...', totalPages];
    if (currentPage > 3 && currentPage < totalPages - 2) pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    if (currentPage === 3 && totalPages > 5) pageNumbers = [1, 2, 3, 4, '...', totalPages];
    if (currentPage === totalPages - 2) pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    if (currentPage > totalPages - 2) pageNumbers = [1, '...', totalPages - 2, totalPages - 1, totalPages]
  }
  return pageNumbers.map((item, index) => {
    if (typeof item === 'number') return <button key={index} className={currentPage === item ? 'Pagination-button active' : 'Pagination-button'} onClick={() => onChange(item)}>{item}</button>
    else return <p key={index}>...</p>
  });
};
