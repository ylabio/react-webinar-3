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

export function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const copy = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key])
    }
  }

  return copy
}

export function getCatOptions(categories) {
  const proxy = deepCopy(categories)
  const options = [{ title: 'Все', _id: '', value: '' }]

  const collectOptions = (cat, level = 0) => {
    // console.log('Category:', cat)

    if (!options.includes(cat)) {
      cat.title = level > 0 ? '- '.repeat(level) + cat.title : cat.title
      cat.value = cat._id
      options.push(cat)
      const subs = proxy.filter(c => c.parent?._id === cat._id)
      // console.log('This category subs:', subs)
      subs.forEach(sub => {
        // console.log('iterating subs')
        if (options.includes(sub)) delete options[options.indexOf(sub)]
        collectOptions(sub, level + 1)
      })
    }
  }

  proxy.forEach(cat => collectOptions(cat, 0))

  return options
}
