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



export const createTreeLists = (items, parentId = null) => {
  let list = [];
  for (let i = 0; i < items.length; i++) {
    if (!parentId && !items[i].parent) {
      list.push(items[i]);
    } else if (items[i].parent && items[i].parent._id === parentId) {
      list.push(items[i]);
    }
  }

  for (let j = 0; j < list.length; j++) {
    list[j] = {
      ...list[j],
      children: createTreeLists(items, list[j]._id)
    }
  }

  return list;
}

export const parseTree = (items, level = 0) => {
  let list = [];
  for (let i = 0; i < items.length; i++) {
    const currentItem = {
      title: `${'- '.repeat(level)}${items[i].title}`,
      value: items[i]._id ? items[i]._id : items[i].value
    };
    list.push(currentItem);
    const nextLevel = level + 1;
    if (items[i].children) {
      list = [...list, ...parseTree(items[i].children, nextLevel)];
    }
  }
  return list;
}







  // items.filter(((item) => {
  //   if (!item.parent || item.parent._id === parentId) {
  //     console.log('hello');
  //     return item;
  //   }
  // })).map((item) => ({
  //   ...item,
  //   children: createLinkedLists(items, item._id)
  // }))
