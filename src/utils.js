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

export function createCategoryList(categories, parent = null, visited = new Set()) {
  let connection = {};
  categories
    .filter(category => category.parent?._id === parent?._id)
    .forEach(category => {
      if (!visited.has(category._id)) {
        visited.add(category._id);
        connection[category.title] = {
          id: category._id,
          ...createCategoryList(categories, category, visited)
        };
      }
    });
  return connection;
}

export function isValidToken(token) {
  if (token.length !== 64) {
    return false;
  }
  if (typeof token !== "string") {
    return false;
  }
  const regex = /^[0-9a-fA-F]+$/
  if (!regex.test(token)) {
    return false;
  }
  return true;
}
