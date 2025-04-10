import { DEFAULT_CATEGORY } from './constants';

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
 * Форматирование разрядов числа
 * @returns {Array}
 * @param categories {Array}
 */
function createCategoryTree(categories) {
  const categoryMap = {};
  const categoriesList = [{ ...DEFAULT_CATEGORY }];

  categories.forEach(category => {
    categoryMap[category._id] = {
      ...category,
      children: [],
    };
  });

  categories.forEach(category => {
    if (category.parent) {
      const parentId = category.parent._id;
      if (categoryMap[parentId]) {
        categoryMap[parentId].children.push(categoryMap[category._id]);
      }
    } else {
      categoriesList.push(categoryMap[category._id]);
    }
  });

  return categoriesList;
}

export function createCategoryList(list) {
  const categoryTree = createCategoryTree(list);

  const newCategoryList = [];

  function getCategoryArray(arr, markLen) {
    arr.forEach(el => {
      newCategoryList.push({ ...el, marker: '- '.repeat(markLen) });
      if (el.children) {
        getCategoryArray(el.children, markLen + 1);
      } else {
        newCategoryList.push({ ...el, marker: '- '.repeat(markLen) });
      }
    });
  }

  categoryTree.forEach(el => {
    newCategoryList.push({ ...el, marker: '' });
    getCategoryArray(el.children, 1);
  });

  return newCategoryList;
}

export function createCategoryQuery(categories, id) {
  const categoriesIdList = [];

  function findCategoryId(categoryChildren) {
    categoryChildren.forEach(category => {
      categoriesIdList.push(category._id);
      if (category.children.length) {
        findCategoryId(category.children);
      }
    });
  }

  for (let category of categories) {
    if (category._id === id) {
      categoriesIdList.push(category._id);
      if (category.children.length) {
        findCategoryId(category.children);
      }
    }
  }

  return categoriesIdList.join(',');
}
