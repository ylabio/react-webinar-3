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

export function getCategoriesTree(categories) {
  const mainCategories = categories.filter(category => !category.parent);

  function createTree(categoryId) {
    const currentCategory = categories.find(category => category._id === categoryId);

    const children = categories.filter(category => category.parent && (category.parent._id === categoryId));

    const isChildrenExist = children.length;

    if (!isChildrenExist) {
      return {...currentCategory}
    }

    const subCategories = children.map(children => createTree(children._id));

    return {
      ...currentCategory,
      children: subCategories
    };
  }

  function formatTree(tree) {
    const categories = [];

    tree.forEach((item) => {
      addLevel(item);
    });

    function addLevel(item, depth = '') {
      categories.push({value: item._id ? item._id : item.value, title: `${depth}${item.title}`});

      if (item.children) {
        item.children.forEach((child) => addLevel(child, `- ${depth}`));
      }
    }

    return categories;
  }

  const categoriesTree = mainCategories.map(mainCategory => createTree(mainCategory._id));

  const categoriesTreeWithLevels = formatTree(categoriesTree)

  return categoriesTreeWithLevels;
}

