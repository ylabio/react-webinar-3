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

export const createCategoryTree = (items = []) => {
  const cache = new Map();
  const firstLineKeys = [];

  for (let el of items) {
    const itemParent = cache.get(el.parent?._key);

    if (itemParent) {
      itemParent.children.push(el._key);
    } else {
      firstLineKeys.push(el._key);
    }
    cache.set(el._key, { ...el, children: [] });
  }

  const res = [];
  const createLineTree = (key, combinedKey, deep) => {
    const item = cache.get(key);
    res.push({ ...item, combinedKey, prefix: "- ".repeat(deep) });
    for (let childKey of item.children) {
      createLineTree(childKey, `${combinedKey}${childKey}`, deep + 1);
    }
  };

  Array.from(firstLineKeys).map((key) => {
    createLineTree(key, key, 0);
  });

  return res.sort((a, b) => a.combinedKey.localeCompare(b.combinedKey));
};
