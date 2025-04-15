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


export function categoryTree(categories = []) {
  const map = new Map(categories.map(cat => [cat._id, { ...cat, children: [] }]));

  const roots = [];

  for (const cat of map.values()) {
    const parentId = cat.parent?._id;
    if (parentId && map.has(parentId)) {
      map.get(parentId).children.push(cat);
    } else {
      roots.push(cat);
    }
  }

  const result = [];

  const flatten = (nodes, level = 0) => {
    for (const node of nodes) {
      result.push({ value: node._id, title: `${'- '.repeat(level)}${node.title}` });
      flatten(node.children, level + 1);
    }
  };

  flatten(roots);
  return result;
}


export function getAllChild(categories = [], parentId = '') {
  const result = [];

  function findChildren(currentParentId) {
    categories.forEach(category => {
      if (category.parent && category.parent._id === currentParentId) {
        result.push(category._id);
        // Рекурсивно ищем потомков текущей категории
        findChildren(category._id);
      }
    });
  }

  findChildren(parentId);
  return result;
}
