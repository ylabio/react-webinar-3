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

export function categoryTree(items) {   

  function listToTree(items, value = null) {     
    return items.filter(item => value != null ? item.parent && item.parent._id === value : item.parent === value).map(item => {      
      return { ...item, children: listToTree(items, item.value) }
    });
  }     

  let listTreeWithDepth = []  

  function addDepth(arr, depth = 0) {
    arr.forEach(obj => {
      obj.depth = depth
      let prefix = '- '        
      listTreeWithDepth.push({...obj, title: `${prefix.repeat(obj.depth)}${obj.title}`})
      addDepth(obj.children, depth + 1)
    })   
  }

  addDepth(listToTree(items))

  return listTreeWithDepth
}  
