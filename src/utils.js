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

export function createCategories(categoryArrayFromServer) {
  const makeSubcategories = (categoryArray) => {
    const result = [];
    for (const category1 of categoryArray) {
      category1.subscategories = [];
      if (category1.parent === null) result.push(category1);
      else {
        for (const category2 of categoryArray) {
          if (category1.parent._id === category2._id) {
            category2.subscategories.push(category1);
            result.push(category2);
            break;
          }
        }
      }
    }

    const resultObject = {};
    const finalResult = [];
    for (const element of result) {
      if (element.parent === null && !resultObject[element.title]) {
        resultObject[element.title] = element;
        finalResult.push(element);
      }
    }
    return finalResult;
  };

  const createInterface = (array, res = [], levelOfDepth = 0) => {
    if (!array.length) return res;

    res.push({
      title: `${'- '.repeat(levelOfDepth)}${array[0].title}`,
      value: array[0]._id,
    });

    if (array[0].subscategories) {
      createInterface(array[0].subscategories, res, levelOfDepth + 1);
    }
    return createInterface(array.slice(1), res, levelOfDepth);
  };

  return createInterface(makeSubcategories(categoryArrayFromServer));
}
