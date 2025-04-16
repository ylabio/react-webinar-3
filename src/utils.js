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
 * Проверяет ответ от сервера
 * @param {Response} res
 * @returns {Promise<Object>}
 * @throws {Error}
 */
export const checkResponse = async res => {
  const data = await res.json();

  if (!res.ok) {
    /**
     * Error with issues array
     * @type {Error}
     */
    const error = new Error(`Ошибка ${res.status}`);
    error.issues = data.error.data.issues || [];
    throw error;
  }

  return data;
};

/**
 * Преобразование плоского списка категорий в иерархию с отступами
 * @param {Array} categories - исходный список категорий
 * @returns {Array} - список с title и _id, где title оформлен с отступами
 */

export const formatCategories = categories => {
  const map = new Map();
  const roots = [];

  for (const cat of categories) {
    map.set(cat._id, { ...cat, children: [] });
  }

  for (const cat of categories) {
    const parentId = cat.parent?._id;
    if (parentId && map.has(parentId)) {
      map.get(parentId).children.push(map.get(cat._id));
    } else {
      roots.push(map.get(cat._id));
    }
  }

  const result = [];

  const traverse = (node, level = 0) => {
    for (const child of node.children) {
      result.push({
        _id: child._id,
        title: child.title,
        formatTitle: '- '.repeat(level) + child.title,
      });
      traverse(child, level + 1);
    }
  };

  for (const root of roots) {
    traverse(root);
  }

  return [{ _id: 'all', title: 'Все', formatTitle: 'Все' }, ...result];
};
