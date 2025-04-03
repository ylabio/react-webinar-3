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


export const createPagination = (page, totalPages) => {
  const pages = [];

  // Всегда отображаться первую страницу 
  pages.push(1);

  // Если страниц менее 5, то будут показаны все  
  if (totalPages <= 5) {
    for (let i = 2; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  // Левый блок
  if (page === 1) {
    pages.push(2, 3, '...', totalPages);
  }
  else if (page === 2) {
    pages.push(2, 3, '...', totalPages);
  }

  // Правый блок 
  else if (page === totalPages) {
    pages.push('...', totalPages - 2, totalPages - 1, totalPages);
  }
  else if (page === totalPages - 1) {
    pages.push('...', totalPages - 2, totalPages - 1, totalPages);
  }

  // Центральный блок 
  else {
    if (page - 1 > 2) {
      pages.push('...');
    }

    pages.push(page - 1, page, page + 1);

    if (page + 2 < totalPages) {
      pages.push('...');
    }

    pages.push(totalPages);
  }

  return pages;
};

