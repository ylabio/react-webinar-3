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

export function formatCategories(categories) {
  const categoriesMap = new Map();
  const tree = [];

  //Создание map коллекции всех категорий
  categories.forEach(category => {
    categoriesMap.set(category._id, { ...category, children: [] });
  })

  //Построение дерева на основе map
  categories.forEach(category => {
    const node = categoriesMap.get(category._id);
    if (node.parent) {
      const parentNode = categoriesMap.get(node.parent._id);
      parentNode.children.push(node);
    } else {
      tree.push(node);
    }
  })

  //Форматирование дерева для того, чтобы категории были вида, который можно передать в select
  const formatTree = (nodes, level = 0) => {
    let formated = [];
    nodes.forEach(node => {
      formated.push({
        value: node._id,
        title: `${'- '.repeat(level)} ${node.title}`
      })
      formated = formated.concat(formatTree(node.children, level + 1));
    })
    return formated;
  }

  return formatTree(tree);
}