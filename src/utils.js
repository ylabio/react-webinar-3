import { dictionary } from './translations/dictionary';
import { DEFAULT_LANG, LABEL } from './constants';

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

/**
 * Преобразует объект параметров в query-строку.
 *
 * @param {Record<string, string | number | boolean | undefined | null>} params - Объект параметров.
 * @returns {string} Готовая query-строка, начинающаяся с `?`, либо пустая строка.
 */
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

/**
 * Строит location-объект с языком, путём и query-параметрами.
 *
 * @param {Object} options
 * @param {string} options.lang - Язык (например, 'en' или 'ru').
 * @param {string} [options.path=''] - Относительный путь (например, '/article/123').
 * @param {Record<string, string | number | boolean | undefined | null>} [options.params={}] - Query-параметры.
 * @returns {{ pathname: string, search: string }} Объект для использования в Link, NavLink или navigate().
 */
export function buildLocationObject({ lang, path = '', params = {} }) {
  return {
    pathname: `/${lang}${path}`,
    search: buildQueryString(params),
  };
}

/**
 * Строит новый location-объект на основе текущего, заменяя язык.
 *
 * @param {string} newLang - Новый язык (например, 'en').
 * @param {Location} location - Текущий объект `location` из `react-router`.
 * @returns {{ pathname: string, search: string }} Новый location-объект.
 */
export function buildLocationWithNewLang(newLang, location) {
  const [, , ...restPath] = location.pathname.split('/');
  const path = restPath.length ? `/${restPath.join('/')}` : '';

  const params = Object.fromEntries(new URLSearchParams(location.search));

  return buildLocationObject({
    lang: newLang,
    path,
    params, // и тут внутри всё уйдёт в buildQueryString
  });
}
