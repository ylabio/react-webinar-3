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

export function depthCategories(categories) {
  const arr = [];
  const map = new Map(categories.map(category => [category._id, { ...category, children: [] }]));

  categories.forEach(category => {
    if (category.parent) {
      const parent = map.get(category.parent._id);
      if (parent) {
        parent.children.push(map.get(category._id));
      }
    }
  });

  function depthCategory(category, depth = 0) {
    const title = '- '.repeat(depth) + category.title;
    arr.push({ value: category._id, title });
    category.children.forEach(child => depthCategory(child, depth + 1));
  }
  const rootCategories = [...map.values()].filter(category => !category.parent);
  rootCategories.forEach(rootCategory => depthCategory(rootCategory));

  return arr;
}

export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  document.cookie = name;
}
