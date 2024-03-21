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

export function modifyArrForFilter(arr) {

  const result = [];
  const addedItems = {};

  function addChildren(parentId, level) {
    for (const item of arr) {
      if (item.parent && item.parent._id === parentId && !addedItems[item._id]) {
        const prefix = '- '.repeat(level);
        const childTitle = `${prefix} ${item.title}`;
        result.push({ ...item, title: childTitle });
        addedItems[item._id] = true;
        addChildren(item._id, level + 1);
      }
    }
  }

  for (const item of arr) {
    if (!item.parent && !addedItems[item._id]) {
      result.push(item);
      addedItems[item._id] = true;
      addChildren(item._id, 1);
    }
  }

  return result;

}
