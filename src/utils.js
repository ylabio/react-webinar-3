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
 * Построение дерева категорий
 */

export function buildCategoriesTree(categories) {
  const result = [];

  const categoryMap = new Map(
    categories.map(category => [category._id, { ...category, children: [] }]),
  );

  categories.forEach(category => {
    if (category.parent) {
      const parent = categoryMap.get(category.parent._id);
      const child = categoryMap.get(category._id);
      if (parent && child) {
        parent.children.push(child);
      }
    }
  });

  const formatCategory = (category, level = 0) => {
    const prefix = '-'.repeat(level);
    result.push({
      value: category._id,
      title: `${prefix}${category.title}`,
    });
    category.children.forEach(child => formatCategory(child, level + 1));
  };

  const rootCategories = Array.from(categoryMap.values()).filter(category => !category.parent);

  for (const rootCategory of rootCategories) {
    formatCategory(rootCategory);
  }

  return result;
}

/**
 * Проверка наличия токена
 */

export function isAuth() {
  const token = localStorage.getItem('authToken');

  return !!token;
}
