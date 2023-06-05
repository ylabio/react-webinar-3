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

export function parseCategoryList(categoryList) {
  function levelParsing(children = [], parsed = [], level = 1) {
    if (children.length === 0) {
      return parsed;
    }
    const newParsed = structuredClone(parsed);
    let newChildren = structuredClone(children);
    const newParents = [];
    parsed.at(-1).forEach((parent) => {
      newChildren = newChildren.filter((category) => {
        if (category.parent._id === parent._id) {
          newParents.push({...category, level});
          return false;
        }
        return true;
      });
    });
    if (newParents.length === 0) {
      return newParsed;
    }
    newParents.forEach((category) => {
      category.title = `${'- '.repeat(category.level)}${category.title}`;
    });
    newParsed.push(newParents);
    return levelParsing(newChildren, newParsed, level + 1);
  }

  const parents = [];
  const filteredChildList = categoryList.filter((category) => {
    if (category.parent === null) {
      parents.push({...category, level: 0});
      return false;
    }
    return true;
  });
  const parsedLevelCat = levelParsing(filteredChildList, [parents]);

  const catListFinal = parsedLevelCat.reduce((acc, val) => acc.concat(val), []);
  function sortCatList(parsedLevelCat, draftArr, finalArr = []) {
    if (parsedLevelCat.length === 0) {
      return finalArr;
    }
    const newParsedLevelCat = structuredClone(parsedLevelCat);
    let newFinalArr = structuredClone(finalArr);
    newParsedLevelCat[0].forEach((category) => {
        const catIndex = newFinalArr.findIndex((item) => category._id === item._id);
        if (catIndex < 0) {
          newFinalArr = [...newFinalArr, category];
        }
        const children = draftArr.filter((child) => child.parent !== null && child.parent._id === category._id);
        if (children.length > 0) {
          if (catIndex < 0) {
            newFinalArr = [...newFinalArr, ...children];
          } else {
            newFinalArr.splice(catIndex + 1, 0, ...children);
          }
        }
    });
    return sortCatList(parsedLevelCat.filter((_, idx) => idx !== 0), draftArr, newFinalArr);
  }

  const sortedCategories = sortCatList(parsedLevelCat, catListFinal);

  const toFilterCategories = sortedCategories.map(({_id, title}) => ({value: _id, title}));

  return toFilterCategories;
}