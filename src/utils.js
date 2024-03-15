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

  for (const item of arr) {
    if (!addedItems[item._id]) {
      result.push(item);
      addedItems[item._id] = true;

      const parentId = item._id;
      for (const childItem of arr) {
        if (childItem.parent && childItem.parent._id === parentId && !addedItems[childItem._id]) {
          const level = item.title.split('-').length - 1;
          const prefix = '-'.repeat(level + 1);
          const childTitle = `${prefix} ${childItem.title}`;
          result.push({...childItem, title: childTitle});
          addedItems[childItem._id] = true;

          const childParentId = childItem._id;
          for (const grandChildItem of arr) {
            if (grandChildItem.parent && grandChildItem.parent._id === childParentId && !addedItems[grandChildItem._id]) {
              const grandChildTitle = `-- ${grandChildItem.title}`;
              result.push({...grandChildItem, title: grandChildTitle});
              addedItems[grandChildItem._id] = true;
            }
          }
        }
      }
    }
  }

  return result;
}
