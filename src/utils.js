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

//
export function formatCategories(categories) {
  let depths = {}
  
  // добавим глубину вложенности для каждой категории
  let categoriesWithDepth = categories.map(item => {
      let depth = item.parent ? depths[item.parent._id] + 1 : 0
      
      depths[item._id] = depth
      item.depth = depth

      return item;
  })

  // отсортируем по возрастанию вложенности
  let sortedCategories = categoriesWithDepth.toSorted((a,b) => { return a.depth - b.depth })

  let result = []

  // изменим порядок таким образом, чтобы категории-потомки шли сразу после своих родителей
  sortedCategories.forEach((item) => {
    if (item.depth !== 0) {
      let parentIndex = result.findIndex((element) => element._id === item.parent._id)
      result.splice(parentIndex + 1, 0, item)
    } else {
      result.push(item)
    }
  })

  return result.map(item => { return { value: item._id, title: '-'.repeat(item.depth) + item.title} })
}