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
 * Cоздание дерева
 * @param array {Array}
 * @returns {Array}
 */
export function buildTree(array) {
  const map = new Map(array.map(item => [item.id, item]));
  for (let item of map.values()) {
    if (!map.has(item.parent)) {
      continue;
    }
    const parent = map.get(item.parent);
    parent.children = [...parent.children || [], item];
  }
  return [...map.values()].filter(item => !item.parent);
}

/**
 * Обход дерева
 * @param array {Array}
 * @param dept {Number}
 * @returns {Array}
 */

export function traversalTree(array, depth) {
  let result = [];
  result.push({value: '', title: 'Все'});

  function traversal(arr, depth) {
    arr.map(el => {
      result.push({ value: el.id, title: (' - ').repeat(depth) + el.title, depth });

      if (el.children) {
        traversal(el.children, depth + 1);
      }
    })
  }

  traversal(array, depth);
  return result;
};
