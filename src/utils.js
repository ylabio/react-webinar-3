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
 * Сортировка вложенного списка с категориями товаров
 * @param categories {[Oblect]}
 * @param parentId {String}
 * @param count {Number}
 * @returns {[Object]}
 */
export function sortCategories(categories, parentId = null, count = 0) {
  const sortedItems = [];

  for (const item of categories) {
    if ((item.parent === null && parentId === null) || (item.parent && item.parent._id === parentId)) {
      const sortedItem = {
        ...item,
        value: item._id,
        title: '- '.repeat(count) + item.title
      }
      sortedItems.push(sortedItem);
      const children = sortCategories(categories, item._id, count + 1);
      sortedItems.push(...children);
    }
  }

  return sortedItems;
}
