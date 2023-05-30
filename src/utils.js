import lang from 'lang.json';
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
 * Получение списка пагинации
 * @param currPage {Number}
 * @param totalPages {Number}
 * @returns {Array}
 */
export function paginationList(currPage, totalPages, step=1,space="..."){
  const first = 1;

  const pagination = [first];
  if (totalPages > first) {
    let prev = currPage - step;
    let next = currPage + step;

    if (prev < first) {
      prev += step;
      next += step;
    }
    if (next > totalPages) {
      prev -= step;
      next -= step;
    }
    if (prev > first + 1) pagination.push(space);
    const start = Math.max(first, prev);
    const end = Math.min(totalPages, next);

    for (let p = start; p <= end; p++) {
      if (!pagination.includes(p)) pagination.push(p);
    }
    if (next < totalPages - 1) pagination.push(space);
    if (!pagination.includes(totalPages)) pagination.push(totalPages);
  }
  return pagination;
}

export function translate(path, curr="en"){
  const paths=path.split(".");
  let obj=lang[curr];
  
  for (let i=0 ; i<paths.length;i++){
    if (obj[paths[i]]) obj=obj[paths[i]]
  }

  return obj
}