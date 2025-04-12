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

export function categoryTree(categories) {
  const categoryMap = new Map();
  categories.forEach(cat => {
    categoryMap.set(cat._id, { ...cat, children: [] });
  });

  const roots = [];
  categoryMap.forEach(cat => {
    if (cat.parent && cat.parent._id) {
      const parent = categoryMap.get(cat.parent._id);
      parent.children.push(cat);
    } else {
      roots.push(cat);
    }
  });

  const result = [];

  function flatten(categories, level = 0) {
    categories.forEach(cat => {
      const prefix = '-'.repeat(level);
      result.push({ value: cat._id, title: `${prefix}${cat.title}` });
      if (cat.children.length > 0) {
        flatten(cat.children, level + 1);
      }
    });
  }
  flatten(roots);

  return result;
}

export function getAllChild(categories, parentId) {
  const result = [parentId];

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
