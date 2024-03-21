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


// export function category(categoryArr){
//   let arr = [{value:'all',title:'Все'}];
//   let parentId = null
//   let kidId = null;
  

//   for (let elem of categoryArr){
//     if (elem.parent == null){
//       arr.push({value:elem._id,title:elem.title})
//       parentId = elem._id;
//     }
//     else if (elem?.parent?._id == parentId){
//       arr.push({value:elem._id,title: '- ' + elem.title})
//       kidId = elem._id;
//       for (let elem2 of categoryArr){
//         if (elem2?.parent?._id == kidId){
//           arr.push({value:elem2._id,title: '- - ' + elem2.title})
//         }
//       }
//     }
    
    
//   }
//   return arr;
// }


export function category(categoryArr, parent = null, count = 0) {
  const arr = [];
  for (let elem of categoryArr){
    if ((elem.parent?._id === parent && elem.parent) || (!elem.parent && !parent)) {
      arr.push({title: ` ${'- '.repeat(count)} ${elem.title}`,value: elem._id});
      arr.push(...category(categoryArr, elem._id, count + 1));
    }
  };
  return arr;
}