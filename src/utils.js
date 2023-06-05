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


export function categoriesFormat(items, initCategories = []) {
  let result = initCategories;
  let level = {};
  let map = {};

  items.forEach(item => {
      level[item._id] = item.parent ? level[item.parent._id] + 1 : 0;
      let prefix = '- '.repeat(level[item._id]);

      let obj = {
          value: item._id,
          title: prefix + item.title,
          childCount: 0
      };

      //Вставляем после непосредственного предка
      map[item._id] = obj;
      if (item.parent) {
          let index = result.indexOf(map[item.parent._id]) + map[item.parent._id].childCount;
          map[item.parent._id].childCount++
          result.splice(index + 1, 0, obj);
      } else {
          result.push(obj);
      }
  });

  return result;
}

