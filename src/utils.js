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


export function formatCategories(categories) {
    // ищем все корневые узлы
    const rootItems = categories.filter((item) => item.parent === null);

    //функция, которая будет возвращать отформатированный массив
    const formatItems = (list, formattedList = [], level = 0) => {
      const result = list.reduce((acc, item) => {
        const indents = '- '.repeat(level);
        const newAcc = [...acc, { value: item._id, title: `${indents}${item.title}` }];
        const children = categories.filter((child) => child?.parent?._id === item._id);
        if (children.length !== 0) {
          return formatItems(children, newAcc, level + 1);
        }
        return newAcc;
      }, formattedList);
      return result;
    }
    return formatItems(rootItems);
}

