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

export function sortCategories(categories, parent = null, indent = 0) {
  const sortedCategories = [];
  categories.forEach((category) => {
    if ((category.parent && category.parent._id === parent) || (!category.parent && parent === null)) {
      const sortedCategory = {
        ...category,
        indent,
        value: category._id,
        //  используется для создания отступов в иерархическом представлении категорий. Количество повторений определяется переменной indent, которая увеличивается на каждом уровне иерархии
        title: '- '.repeat(indent) + category.title
      };
      sortedCategories.push(sortedCategory);
      //вызываем рекурсивно эту же функцию
      const childCategories = sortCategories(
        categories,
        category._id,
        indent + 1
      );
      sortedCategories.push(...childCategories);
    }
  });
  return sortedCategories;
}