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

const getTree = (list, parent = null, level = 0) => {
  const result = list
  .filter((item) => {
    const parentId = item.parent?._id || null;
    return parentId === parent})
  .map((item) => ({ ...item, level, children: getTree(list, item._id, level + 1)}));
  return result;
}

const getFormattedList = (tree, formattedList = []) => {
  const result = tree.reduce((acc, item) => {
    const indents = '- '.repeat(item.level);
    const newAcc = [...acc, { value: item._id, title: `${indents}${item.title}` }];
    if (item.children) {
      return getFormattedList(item.children, newAcc);
    }
    return newAcc;
  }, formattedList);
  return result;
}

export function formatCategories(list) {
  return getFormattedList(getTree(list));
}

