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

function getTree(list) {
  const map = {};
  list.forEach(item => {
    map[item._id] = { ...item, children: [] };
  });

 
  list.forEach(item => {
    if (item.parent !== null) {
      const parentId = item.parent._id;
      map[parentId].children.push(map[item._id]);
    }
  });


  const addIndentation = (item, level = 0) => {
      const indent = '-'.repeat(level);
      item.title = `${indent}${item.title}`;
      item.children.forEach(child => addIndentation(child, level + 1));
  };

  Object.values(map).forEach(item => {
    if (item.parent === null) {
      addIndentation(item);
    }
  });

  const result = Object.values(map).filter(item => item.parent === null);

return result;
}

function getFormattedList(list) {
  const formattedList = [];
  const rootItems = Object.values(list).filter((item) => item.parent === null);

  const func = (item) => {
    const result = [{ value: item._id, title: item.title }];
    item.children.forEach((child) => {
      result.push(...func(child));
    });
    return result;
  };

  rootItems.forEach((item) => {
    formattedList.push(...func(item));
  });
  return formattedList;
};

export function formatCategories(list) {
  return getFormattedList(getTree(list));
}

