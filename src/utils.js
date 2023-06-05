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

export function transformCategories(categories) {
  const res = [];

  const normalize = (item) => {
    let hyphen = "";
    const stack = [item];
    while (stack.length) {
      const elem = stack.shift();
      if (elem.parent) {
        stack.push(
          categories.find((item) => item._id === elem.parent._id)
        );
        hyphen += "- ";
      }
    }
    item = { ...item, title: hyphen + item.title };
    if (item.parent) {
      let idx = res.findIndex((el) => el._id === item.parent._id);
      if (idx !== -1) {
        res.splice(idx + 1, 0, item);
      } else {
        res.push(item);
      }
    } else {
      res.push(item);
    }
  };
  categories.forEach((item) => normalize(item));
  return res.map((item) => ({ value: item._id, title: item.title }));
}
