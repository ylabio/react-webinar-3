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

export function constructCategoryList(categories) {
  const categoriesById = {};
  categories.forEach((category) => {
    categoriesById[category._id] = category;
    category.subCategories = [];
  });

  categories.forEach((category) => {
    const parentId = category.parent && category.parent._id;
    if (parentId && categoriesById[parentId]) {
      categoriesById[parentId].subCategories.push(category);
    }
  });

  return flattenCategories(categories.filter((el) => !el.parent)).map((el) => ({
    value: el._id,
    title: el.title,
  }));
}

function flattenCategories(categories, depth = 0) {
  let flattenedCategories = [];
  categories.forEach((category) => {
    category.title = !depth
      ? category.title
      : "- ".repeat(depth) + " " + category.title;
    flattenedCategories.push(category);
    if (category.subCategories.length > 0) {
      const subCategories = flattenCategories(
        category.subCategories,
        depth + 1
      );
      flattenedCategories = flattenedCategories.concat(subCategories);
    }
  });
  return flattenedCategories;
}
