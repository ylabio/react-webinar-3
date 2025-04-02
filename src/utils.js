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


export function generatePaginatedApiUrl(baseUrl, currentPage) {
  return `${baseUrl}?limit=10&skip=${(currentPage - 1) * 10}&fields=items(_id, title, price),count`;
}

export function generatePaginationArray(currentPage, count, limit) {
  const maxPade = Math.ceil(count / limit);
  const id = +currentPage;

  let arrStrart = [];
  let arrMiddle = [];
  let arrEnd = [];

  switch (true) {
    case id <= 2:
      arrStrart = [1, 2, 3];
      arrEnd = [0, maxPade];
      break;
    case id === 3:
      arrStrart = [1, 2, 3, 4];
      arrEnd = [0, maxPade];
      break;
    case id >= maxPade - 1:
      arrStrart = [1, 0];
      arrEnd = [maxPade - 2, maxPade - 1, maxPade];
      break;
    case id === maxPade - 2:
      arrStrart = [1, 0];
      arrEnd = [maxPade - 4, maxPade - 2, maxPade - 1, maxPade];
      break;
    default:
      arrStrart = [1, 0];
      arrMiddle = [id - 1, id, id + 1];
      arrEnd = [0, maxPade];
  }

  return [...arrStrart, ...arrMiddle, ...arrEnd];
}