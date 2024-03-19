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
 * Форматирование категорий
 * @param list {Array}
 * @returns {Array}
 */
export function categoriesFormat(list = []) {
  function getDepth(item, acc = '') {
    if (item.parent) {
      const found = list.find((node) => node._id === item.parent._id);
      acc = `- ${acc}`;
      return getDepth(found, acc);
    } else {
      return acc;
    }
  }
  const nestedList = list.map((item) => {
    const dash = getDepth(item);
    item.title = dash + item.title;
    return item;
  })

  const result = nestedList.filter((item) => !item.parent);
  const children = nestedList.filter((item) => item.parent);

  function putChildren(arr) {
    const restChildren = arr
    .reverse()
    .filter((item) => {
      const parentIndex = result.findIndex((node) => node._id === item.parent._id);
      parentIndex >= 0 && result.splice(parentIndex + 1, 0, item);
      return parentIndex >= 0 ? 0 : 1;
    })
    if (restChildren.length) {
      return putChildren(restChildren);
    }
  }
  putChildren(children);

  return result.map((category) => ({value: category._id, title: category.title}));
}
