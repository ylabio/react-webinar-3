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
 * Получение массива для пагинации
 * @param value {Number} текущая страница
 * @param value {Number} последняя страница
 * @returns {Array}
 */
export function getPageNumbers(page, lastPage) {
  if (lastPage <= 5) {
    const result = [];
    for (let i = 1; i < lastPage; i += 1) {
      result.push(i);
    }
    return result;
  } else {
    switch (page) {
      case 1:
      case 2:
        return [1, 2, 3, '...', lastPage];
      case 3:
        return [1, 2, 3, 4, '...', lastPage];
      case lastPage - 2:
        return [1, '...', lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
      case lastPage - 1:
      case lastPage:
        return [1, '...', lastPage - 2, lastPage - 1, lastPage];
      default:
        return [1, '...', page - 1, page, page + 1, '...', lastPage];
    }
  }
}

/**
 * Установка текущей локали
 * @param string {String} 
 */
export function setLocale(locale) {
  return window.localStorage.setItem('lang', locale);
}

/**
 * Загрузка сохраненной локали
 * @returns {String}
 */
export function getLocale() {
  return localStorage.getItem('lang');
}

/**
 * Получение id из url
 * @returns {String}
 */
export function getIdFromUrl() {
  const url = window.location.href;
  return url.split('/').reverse()[0];
}
