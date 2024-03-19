import { func } from "prop-types";

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

/*
const result = [];
export function buildHierarchy(items, parent = null, index = [], tab = '-') {
  
  for (let i = 0; i < items.length; i++) {
    if (!parent && !items[i].parent && !index.includes(i)) {
      index.push(i);
      result.push(items[i].title);
      buildHierarchy(items, items[i], index);
    }
    
    if (parent && items[i].parent && (items[i].parent._id === parent._id)) {
      result.push(tab + items[i].title);
      buildHierarchy(items, items[i], index, tab + '-');
    }
    
  }

  return result;
}
*/

export function buildHierarchy(items, parent = null, tab = '') {
  // Фильтруем элементы на основе того, есть ли у них родитель и соответствует ли он текущему родителю
  const filteredItems = items.filter(item =>
    parent ? item.parent && item.parent._id === parent._id : !item.parent
  );

  // Рекурсивно строим иерархию
  return filteredItems.reduce((result, item) => {
    // Добавляем текущий элемент
    result.push(tab + item.title);
    // Рекурсивно добавляем дочерние элементы, увеличивая отступ
    const children = buildHierarchy(items, item, tab + '-');
    // Добавляем результаты к итоговому массиву
    return result.concat(children);
  }, []);
}