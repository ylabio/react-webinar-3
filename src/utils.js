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

export const sortCategories = (categories, result = []) => {

  const subcategories = [];
  categories.forEach((item) => {
    const noParent = !item.parent || !categories.find((parent) => parent._id === item.parent._id)
    if(noParent) return (item.level = 0, result.unshift(item));
    subcategories.push(item);
  });

  const sortChildren = (children) => {
    const unhandleds = [];
    children.forEach((item) => {
      const parentIndex = result.findIndex((parent) => (
        parent._id !== item.parent._id
          ? false
          : (item.level = parent.level + 1, true)));
      if(parentIndex === -1) return unhandleds.push(item);
      result.splice(parentIndex + 1, 0, item);
    });
    return !unhandleds.length ? result : sortChildren(unhandleds, result);
  }
  return sortChildren(subcategories);
}
