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

export const getDepth = (item, list) => {
  if (item.parent === null) {
    return -1
  }
  return getDepth(list.find(i => i._id === item.parent._id), list) + 1
}

export const makeTree = (items) => {
  const tree = []
  const mappedArr = {}
      
  items.forEach(function(item) {
    const id = item._id;
    if (!mappedArr.hasOwnProperty(id)) {
      mappedArr[id] = item;
      mappedArr[id].children = [];
    }
  })
  
  for (const id in mappedArr) { 
    const mappedElem = mappedArr[id];
    if (mappedElem.parent !== null) { 
      const parentId = mappedElem.parent._id;
      mappedArr[parentId].children.push(mappedElem); 
    } else { 
      tree.push(mappedElem);
    } 
  }
  return tree;
}

export const multiplyString = (num, string) => {
  let arr = []
  for (let i = 0; i <= num; i++) {
    arr.push(string)
  }
  return arr.join('')
}

export const getItemsReqursively = (node, res = []) => {
  for (const child of node.children) {
    res.push(child);
    getItemsReqursively(child, res);
  }
  return res
}
