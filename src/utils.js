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

// Функция для рекурсивного добавления категорий с учетом их иерархии
export function modificationCategory (categories) {
  function getParentCategory(category) {
    return category.parent ? categories.find(c => c._id === category.parent._id) : null;
  }

  function getHierarchyLevel(category) {
    let level = 0;
    let parent = getParentCategory(category);
    while (parent) {
      level++;
      parent = getParentCategory(parent);
    }
    return level;
  }

  function buildModifiedCategories(category, modifiedCategories) {
    const hierarchyLevel = getHierarchyLevel(category);
    const prefix = ' -'.repeat(hierarchyLevel);
    const modifiedTitle = prefix + ' ' + category.title;
    modifiedCategories.push({ value: category._id, title: modifiedTitle });

    categories
      .filter(c => c.parent && c.parent._id === category._id)
      .forEach(child => buildModifiedCategories(child, modifiedCategories));
  }

  const modifiedCategories = [];
  categories.filter(category => !category.parent).forEach(rootCategory => {
    buildModifiedCategories(rootCategory, modifiedCategories);
  });

  return modifiedCategories;
}