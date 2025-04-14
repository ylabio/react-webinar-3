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
 * Форматирование массива категорий
 * @param categoryList {Array}
 * @returns {Array}
 */

export const sortCategory = (categoryList) => {
  const resultArr = []
  const rootCategory = []
  const categoryArray = categoryList.map(category => {
    return {
      ...category,
      children:[]
    }
  })
  categoryArray.forEach(category => {
    if (category.parent) {
      const parent = categoryArray.find(item => item._id === category.parent._id)
      parent.children.push(category)
    }
    if (category.parent === null) {
      rootCategory.push(category)
    }
  })

  function depthCategory(category, depth = 0) {
    const title = '- '.repeat(depth) + category.title;
    resultArr.push({ value: category._id, title });
    category.children.forEach(child => depthCategory(child, depth + 1));
  }

  rootCategory.forEach(rootCategory => depthCategory(rootCategory))
  
  return resultArr
}
