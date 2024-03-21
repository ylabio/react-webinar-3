/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
}

/**
 * Преобразование категорий
 *
 * @param {Array} categories - Массив категорий, которые требуется преобразовать
 * @return {Array} - Массив преобразованных категорий
 */
export function transformCategories(categories) {
  const transformedCategories = [];

  function traverse(category, depth) {
    transformedCategories.push({
      value: category._id,
      title: `${"- ".repeat(depth)} ${category.title}`.trim(),
    });

    const children = categories.filter(
      (cat) => cat.parent && cat.parent._id === category._id
    );
    children.forEach((child) => {
      traverse(child, depth + 1);
    });
  }

  categories.forEach((category) => {
    if (!category.parent) {
      traverse(category, 0);
    }
  });

  return transformedCategories;
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
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}
