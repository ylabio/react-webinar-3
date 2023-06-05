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

/**
 * Парсинг списка категорий
 * @param coll []
 * @returns []
 */
export function parseCategories(coll) {
  const parsed = coll.slice(); // создаём копию колекции
  // группируем категории
  parsed.forEach((item) => {
    if (!item.parent) return;
    // ищем родительскую категорию и добавляем в ее children[] текущий item
    const parent = parsed.find((i) => i._id === item.parent._id);
    if (parent)
      parent.children ? parent.children.push(item) : (parent.children = [item]);
  });

  return formatter(parsed.filter((i) => !i.parent));
}

/**
 * Форматирование дерева категорий
 * @param tree []
 * @returns []
 */
function formatter(tree) {
  const res = [{ value: '', title: 'Все', dashes: 0 }];
  const iter = (children, depth) => {
    for (const item of children) {
      if (res.find((i) => i.value === item._id)) return;
      const opt = { value: item._id, title: item.title, dashes: depth };
      res.push(opt);
      if (!item.children) continue;
      if (item.children) {
        iter(item.children, depth + 1);
      }
    }
    return res;
  };
  return iter(tree, 0);
}
