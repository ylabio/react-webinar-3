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
Упорядочивает категории в соответствии с их вложенностью и добавляет дефисы перед названиями категорий в зависимости от уровня вложенности.
@param categories {Array} - Массив объектов категорий.
@returns {Array} - Упорядоченный массив категорий.
*/
export function organizeCategories(categories) {
  // Функция для рекурсивного поиска дочерних категорий
  function findChildren(parentId, level) {
    const children = categories.filter(category => category.parent && category.parent._id === parentId);
    children.forEach(child => {
      child.title = `${'-'.repeat(level)}${child.title}`;
      sortedCategories.push(child);
      findChildren(child._id, level + 1);
    });
  }

  const sortedCategories = [];

  // Находим категории верхнего уровня и добавляем их в отсортированный массив
  const topLevelCategories = categories.filter(category => !category.parent);
  topLevelCategories.unshift({ value: "all", title: "Все", parent: null, level: 0, _id: "all" });
  topLevelCategories.forEach(category => {
    category.title = `${category.title}`;
    sortedCategories.push(category);
    findChildren(category._id, 1);
  });

  return sortedCategories;
}
