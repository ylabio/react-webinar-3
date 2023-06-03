import { element } from "prop-types";

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

export function getCategoryList(categories) {
  function getOrderedCategories(categories, parent = null, unique = new Set()){
    let result = {};
    categories.filter(category => category.parent?._id === parent?._id)
      .forEach(category => {
        if (!unique.has(category._id)) {
          unique.add(category._id);
          result[category.title] = {
            id: category._id, ...getOrderedCategories(categories, category, unique)
          };
        }
      });
    return result;
  }

  function createCategoryList(result, level = 0, list = []) {
      const str = ' - '.repeat(level);
      for (let property in result) {
        if (result[property].id !== undefined) {
          list.push({value: result[property].id, title: str + property});
          if (result[property] !== null) {
            createCategoryList(result[property], level + 1, list);
          }
        }
      }
    return list;    
  }

  return createCategoryList(getOrderedCategories(categories));
}