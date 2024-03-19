/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
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
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function getCategories(data) {
  const itemsMap = new Map();
  data.forEach((item) => {
    itemsMap.set(item._id, { ...item, children: [] });
  });
  data.forEach((item) => {
    if (item.parent) {
      const parent = itemsMap.get(item.parent._id);
      if (parent) {
        parent.children.push(itemsMap.get(item._id));
      }
    }
  });
  const rootItems = Array.from(itemsMap.values()).filter(
    (item) => item.parent === null
  );

  const flatten = (items, depth = 0) => {
    return items.reduce((acc, { _id, title, children }) => {
      const prefix = "- ".repeat(depth);
      const newItem = { _id, title: depth > 0 ? `${prefix}${title}` : title };
      const childItems =
        children.length > 0 ? flatten(children, depth + 1) : [];
      return [...acc, newItem, ...childItems];
    }, []);
  };
  return flatten(rootItems);
}
