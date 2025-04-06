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
 * @param locale {String}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


/**
 * Получение массива для пагинации
 * @param currentPage {Number}
 * @param totalPages {Number}
 * @returns {Array}
 */
export function getPaginationRange(currentPage, totalPages) {
  const range = (start, end) => {
    const res = [];
    for (let i = start; i <= end; i++) res.push(i);
    return res;
  };

  if (totalPages <= 7) {
    return range(1, totalPages);
  }

  if (currentPage < 3) {
    return [1, 2, 3, 'dots', totalPages];
  }

  if (currentPage === 3) {
    return [1, 2, 3, 4, 'dots', totalPages];
  }

  if (currentPage > totalPages - 2) {
    return [1, 'dots', totalPages - 2, totalPages - 1, totalPages];
  }

  if (currentPage === totalPages - 2) {
    return [1, 'dots', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    'dots',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'dots',
    totalPages,
  ];
}

export function getLangFromPath(pathname) {
  return pathname?.split('/')[1] || 'ru';
}

export function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
