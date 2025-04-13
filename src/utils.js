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



export function createCategories(items) {

  console.log('items', items);

  const parent = []
  const otherCategories = [];

  if (items.length) {
    return {parent, otherCategories};
  }

  items.forEach((item)=> {
    if (item.parent) {
      otherCategories.push(item);
    } else {
      parent.push(item);
    }
  })

  if (otherCategories.length) {


  }




  return {parent, otherCategories};
}

export function buildCategoryMapTree(items = []) {
  const map = new Map();
  console.log('items', items);
  for (const item of items) {
    const parentId = item.parent?._id || 'parent';

    if (!map.has(parentId)) {
      map.set(parentId, []);
    }

    map.get(parentId).push({
      _id: item._id,
      title: item.title,
    });
  }

  function buildTreeFrom(id, depth = 0) {
    const children = map.get(id) || [];

    return children.map(child => {
      const nestedChildren = buildTreeFrom(child._id, depth + 1);

      // собираем все ID потомков
      const valueIds = [child._id];
      nestedChildren.forEach(n => valueIds.push(...n.valueIds));

      return {
        ...child,
        title: `${'- '.repeat(depth)}${child.title}`,
        valueIds,
        children: nestedChildren,
      };
    });
  }

  return buildTreeFrom('parent');
}



export function flattenCategoryTree(tree) {
  const result = [];

  for (const node of tree) {
    result.push({
      title: node.title,
      id: node._id,
      value: node.valueIds, // для select
      valueIds: node.valueIds

/*    value: node._id, // для select
      valueIds: node.valueIds */
    });

    if (node.children?.length) {
      result.push(...flattenCategoryTree(node.children));
    }
  }

  return result;
}

