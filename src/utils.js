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
export function buildCategoryHierarchy(categories) {
  console.log('categories');
  console.log(categories);
  const categoryMap = {};
  categories.forEach(category => {
    categoryMap[category._id] = category;
  });

  const counter = {};

  const hierarchy = [];

  for (const category of categories) {
    if (!category.parent) {
      hierarchy.push({ title: category.title, _id: category._id });
    } else {
      let currentCategory = category;
      const chain = [];
      
      while (currentCategory.parent) {
        currentCategory = categoryMap[currentCategory.parent._id];
        chain.unshift(currentCategory.title);
      }

      const prefix = '-'.repeat(chain.length);

      const index = hierarchy.findIndex(item => item.title === (chain.length === 1 ? chain[0] : `${prefix.slice(0, -1)} ${chain[chain.length - 1]}`));
      
      if (index < 0) {
        continue;
      }
      if (!counter.hasOwnProperty(hierarchy[index]._id)) {
        counter[hierarchy[index]._id] = 0;
      }

      insertCategoryAtIndex(hierarchy, { title: `${prefix} ${category.title}`, _id: category._id }, index, counter);
    }
  }

  return hierarchy;
}

function insertCategoryAtIndex(hierarchy, category, index, counter) {
  counter[hierarchy[index]._id]++;
  hierarchy.splice(index + counter[hierarchy[index]._id], 0, category);
}
