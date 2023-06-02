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

export function getCategories(categories) {
  let first = new Map();
  let temp = [];
  let result = [];
  for (let i = 0; i < categories.length; i++) {
    let element = categories[i];
      if (element.parent === null) {
        first.set(element._id);
      } 
  }
  console.log(first.keys());
  // for (let i = 0; i < categories.length; i++) {
  //   let element = categories[i];
  //   if (element.parent !== null) {
  //     if (main.indexOf(element.parent._id) !== -1) {
  //       second.set(element._id,[]);
  //     } else {
  //       temp.push[element];
  //     }
  //   }
  // }
  // return result;
}

// export function categoryFormatMaker(categories) {
//   const categoriesNames = [];
//   const mainParents = [];
//   const secondParents = [];
//   for (let category in categories) {
//     if (category.parent === null) {
//         categoriesNames.push(category.title);
//         mainParents.push(category._id);
//     } else {
//         if (mainParents.find((i) => i === category.parents._id) != -1) {
//           categoriesNames.push(category.title);
//         }
//     }
    
//     if (parents.find((i) => i === elem) != -1;)

//   }


// }
