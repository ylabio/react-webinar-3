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


export function buildTreeArray(data) {
  const items = data;
  const tree = [];

  for (const item of items) {
    const node = {_id: item._id, title: item.title, children: []};

    if (item.parent) {
      const parentID = item.parent._id;
      const parent = findNode(tree, parentID);

      if (parent) {
        parent.children.push(node);
      } else {
        const newParent = {_id: parentID, title: null, children: [node]};
        tree.push(newParent);
      }
    } else {
      tree.push(node);
    }
  }

  return tree;
}

function findNode(tree, id) {
  for (const node of tree) {
    if (node._id === id) {
      return node;
    }

    if (node.children.length > 0) {
      const found = findNode(node.children, id);
      if (found) {
        return found;
      }
    }
  }

  return null;
}
