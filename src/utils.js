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

  const categoryMap = {};
  categories.forEach(category => {
    categoryMap[category._id] = category;
  });

  let counter = {};

  const hierarchy = [];
  categories.forEach(category => {
    if (!category.parent) {
      hierarchy.push({title: category.title, _id: category._id});
    } else {
      let parent = category;

      const chain = [];
      while (parent.parent) {
        parent = categoryMap[parent.parent._id];
        chain.unshift(parent.title);
      }

      const prefix = '-'.repeat(chain.length);

      if (chain.length === 1) {
        const index = hierarchy.findIndex(item => item.title === chain[0])
        counter[hierarchy[index]._id] = counter[hierarchy[index]._id] ? counter[hierarchy[index]._id] : 0;
        hierarchy.splice(index + 1 + counter[hierarchy[index]._id], 0,  {title: `${prefix} ${category.title}`, _id: category._id})
        counter[hierarchy[index]._id] += 1
      } else if (chain.length > 1) {
        const index = hierarchy.findIndex(item => item.title === `${prefix.slice(0, prefix.length - 1)} ${chain[chain.length - 1]}`)
        counter[hierarchy[index]._id] = counter[hierarchy[index]._id] ? counter[hierarchy[index]._id] : 0;
        hierarchy.splice(index + 1 + counter[hierarchy[index]._id], 0, {title: `${prefix} ${category.title}`, _id: category._id})
        counter[hierarchy[index]._id] += 1
      }
    }
  });
  return hierarchy;
}
