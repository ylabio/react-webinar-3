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

/**
 * Рекурсивная функция фильтрации элементов
 * @param arr {Array}
 * @returns {Array}
 */
export function arrayRecurseFilter(arr) {
  const parents = [];
  const children = [];

  if (arr.length <= 1) return arr;

  arr.forEach(el => {
    if (!el.parent) {
      parents.push(el);
    } else {
      children.push(el);
    }
  });

  const {result} = filterChildren(parents, children);

  return result;
}

function filterChildren(parents, children, count = 1) {
  let result = [];
  let resChildren = children;

  for (const parent of parents) {
    result.push(parent);
    for (const child of children) {
      if (parent.value === child.parent._id) {
        result.push({...child, title: "- ".repeat(count) + child.title});
        resChildren = resChildren.filter(el => el.value !== child.value);
      }
    }
  }
  count++;

  if (resChildren.length > 0) {
    ({result, resChildren, count} = filterChildren(result, resChildren, count));
  }

  return {result, resChildren, count};
}
