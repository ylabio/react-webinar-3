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
 * Преобразует массив категорий в плоский список с иерархией
 * @param {Array} categories - Массив категорий
 * @param {Object} options - Настройки
 * @param {string} options.prefix - Префикс для вложенности (по умолчанию "- ")
 * @param {string} options.rootTitle - Заголовок для корневой категории
 * @param {Object} options.fields - Маппинг полей: id, title и parent
 * @returns {Array} Плоский список с префиксами для вложенности
 */
export function buildCategoryTree(
  categories,
  {
    prefix = '- ',
    rootTitle = 'Все категории',
    fields = { id: '_id', title: 'title', parent: 'parent._id' }
  } = {}
) {
  if (!Array.isArray(categories)) return [];

  const get = (obj, path) =>
    path
      .split('.')
      .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);

  const categoryMap = categories.reduce((map, item) => {
    const id = get(item, fields.id);
    if (id != null) {
      map[id] = { ...item, children: [] };
    }
    return map;
  }, {});


  const roots = [];
  categories.forEach(item => {
    const id = get(item, fields.id);
    const parentId = get(item, fields.parent);
    const node = categoryMap[id];
    if (!node) return;

    if (parentId != null && categoryMap[parentId]) {
      categoryMap[parentId].children.push(node);
    } else {
      roots.push(node);
    }
  });

  function flatten(nodes, depth = 0) {
    let out = [];
    nodes.forEach(node => {
      const title = `${depth > 0 ? prefix.repeat(depth) : ''}${get(node, fields.title)}`;
      out.push({
        value: get(node, fields.id),
        title,
        rawTitle: get(node, fields.title),
        depth
      });
      if (node.children.length) {
        out = out.concat(flatten(node.children, depth + 1));
      }
    });
    return out;
  }

  return [
    { value: '', title: rootTitle, rawTitle: rootTitle, depth: 0 },
    ...flatten(roots)
  ];
}