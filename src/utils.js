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
 * Преобразует список категорий в плоский список опций для Select с учётом вложенности
 * @param {Array} categories - Список категорий
 * @returns {Array} Опции для Select [{ value, title }, ...]
 *
 */
export function categoriesFormat(categories) {
  const categoryMap = new Map(categories.map(cat => [cat._id, cat]));

  const getLevel = category => {
    let level = 0;
    let current = category;
    while (current.parent && categoryMap.has(current.parent._id)) {
      current = categoryMap.get(current.parent._id);
      level += 1;
    }
    return level;
  };

  const groupedByParent = categories.reduce((acc, cat) => {
    const parentId = cat.parent ? cat.parent._id : null;
    if (!acc[parentId]) acc[parentId] = [];
    acc[parentId].push(cat);
    return acc;
  }, {});

  const sortedCategories = [];
  const addCategories = (parentId = null) => {
    const children = groupedByParent[parentId] || [];
    children.forEach(cat => {
      sortedCategories.push(cat);
      addCategories(cat._id);
    });
  };
  addCategories();

  const options = sortedCategories.map(cat => {
    const level = getLevel(cat);
    const prefix = '–'.repeat(level);
    return {
      value: cat._id,
      title: `${prefix}${cat.title}`,
    };
  });

  return [{ value: '', title: 'Все' }, ...options];
}
