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
 * Строит иерархию категорий с учетом родительских и дочерних категорий.
 * @param {Array<Object>} categories - Массив категорий.
 * @returns {Array<Object>} - Массив объектов категорий с учетом иерархии.
 */
export function buildCategoryOptions(categories, parentId = null, depth = 0) {
  const result = [];
  
  if (!parentId) {
    result.push({ value: 'all', title: 'Все категории' });
  }

  categories.forEach(category => {
    const { _id, title, parent } = category;

    if (parent && parent._id === parentId) {
      const prefix = '-'.repeat(depth);
      const fullTitle = `${prefix} ${title}`;
      result.push({ value: _id, title: fullTitle });

      const children = buildCategoryOptions(categories, _id, depth + 1);
      result.push(...children);
    } else if (!parent && !parentId) {
      const prefix = '-'.repeat(depth);
      const fullTitle = `${prefix} ${title}`;
      result.push({ value: _id, title: fullTitle });

      const children = buildCategoryOptions(categories, _id, depth + 1);
      result.push(...children);
    }
  });

  return result;
}