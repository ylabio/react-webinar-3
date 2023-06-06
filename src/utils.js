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

// вынесение форматирования списка категорий из модуля CategoriesState
export function formatCategories(items) {
  const list = [{ value: '', title: 'Все' }];
  const childs = new Map();
  const roots = [];

  // todo: есть что улучшить
  const recurse = (obj, level = 0) => {
    list.push({ value: obj._id, title: '- '.repeat(level) + ' ' + obj.title });
    const ch = childs.get(obj._id);
    if (!ch)
      return;
    level++;
    ch.forEach(obj => recurse(obj, level));
  };

  items.forEach(obj => {
    const p = obj.parent;
    if (p) {
      if (!childs.has(p._id))
        childs.set(p._id, [obj]);

      else
        childs.get(p._id).push(obj);
    }
    else
      roots.push(obj);
  });

  roots.forEach(obj => recurse(obj));

  return list;
}

// Метод проверяет символы токена на корректность, иначе может упасть код
// типичный токен от апи - a30782107598434d7d4e54f1007eb527f8146c5c8cf3e6b3dfd313a693e3f712
export function validateTokenSymbols(token) {
  return /^[a-zA-Z0-9]+$/.test(token); // Прописные не используются, но пусть пока будет
}