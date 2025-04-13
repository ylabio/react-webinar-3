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

export function sortCategories(categories = []) {
  const result = [];

  function findCategoryChildren(parentList, child, markerRepeat) {
    for (let parent of parentList) {
      if (parent.parent === null) {
        if (!result.some(e => e._id === parent._id)) {
          result.push({ ...parent, marker: '' });
        }
      }
      for (let childCategory of child) {
        if (childCategory.parent && childCategory.parent._id === parent._id) {
          if (!result.some(e => e._id === childCategory._id)) {
            result.push({
              ...childCategory,
              marker: '- '.repeat(markerRepeat),
            });
            findCategoryChildren([childCategory], child, markerRepeat + 1);
          }
        }
      }
    }
  }

  findCategoryChildren(categories, categories, 1);

  return result;
}

export function createCategoryStringQuery(categories, id) {
  let result = id;

  function findCategoryChildrenId(catId, categoriesList) {
    for (const element of categoriesList) {
      if (element.parent) {
        if (element.parent._id === catId) {
          result += `,${element._id}`;
          findCategoryChildrenId(element._id, categoriesList);
        }
      }
    }
  }

  findCategoryChildrenId(id, categories);

  return result;
}
