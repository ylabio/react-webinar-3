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

function createCategoriesTree(categories) {
  const map = Object.assign(
    {},
    ...categories.map((category) => ({
      [category._id]: { ...category, children: [] },
    }))
  );
  return Object.values(map).filter((item) => {
    if (item.parent) {
      map[item.parent._id].children.push(item);
      return false;
    }
    return true;
  });
}

function convertTreeToList(tree, level = 0, arr = []) {
  for (let leaf of tree) {
    arr.push({
      title: '- '.repeat(level) + leaf.title,
      level,
      value: leaf._id,
    });
    if (leaf.children) convertTreeToList(leaf.children, level + 1, arr);
  }

  return arr;
}

export function getHierarchicCategoriesList(categories) {
  const tree = createCategoriesTree(categories);
  return convertTreeToList(tree);
}
