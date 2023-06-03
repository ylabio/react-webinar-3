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

export function stackParents(arr) {
  let parents = [],
      childrens = [];

  for (let i = 0; i < arr.length; i++) {
    arr[i].parent ? childrens.push(arr[i]) : parents.push(arr[i])
  }

  const sorting = (parents, childrens, depth = 1, prefix = '- ') => {
    let rest = [];

    for (let child of childrens) {
      let indexParent = parents.findIndex(parent => parent._id === child.parent._id);
  
      if (parents[indexParent] == undefined) {
        rest.push(child);

        continue;
      }

      child.prefix = prefix.repeat(depth);
  
      parents[indexParent].hasOwnProperty("childrens") ? 
        parents[indexParent].childrens.push(child) 
      : parents[indexParent].childrens = [child]
    }

    if (rest.length > 0) {
      sorting(childrens, rest, depth + 1);
      return;
    }
  }

  sorting(parents, childrens)

  let result = enumerationObject(parents);

  return result;
}

export function enumerationObject(obj) {
  let set = new Set();

  const innerEnum = (obj) => {
    for (let elem of obj) {
      if (elem.hasOwnProperty('childrens')) {
        set.add(elem)

        innerEnum(elem.childrens)
      } else {
        set.add(elem)
      }
    }
  }

  innerEnum(obj);

  return Array.from(set);
}