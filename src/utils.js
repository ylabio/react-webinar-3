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
 * Организация категорий по уровням вложенности
 * @param categories {Array}
 */
export function organizeCategories(categories) {
  // Создаём карту по id для быстрого доступа
  const map = {};
  categories.forEach(cat => {
    map[cat._id] = { ...cat, children: [] };
  });

  // Строим дерево
  const roots = [];
  categories.forEach(cat => {
    const parentId = cat.parent?._id;
    if (parentId && map[parentId]) {
      map[parentId].children.push(map[cat._id]);
    } else {
      roots.push(map[cat._id]);
    }
  });

  // Рекурсивная функция обхода с учётом вложенности
  const result = [];

  function traverse(node, level = 0) {
    result.push({
      value: node._id,
      title: `${'- '.repeat(level)} ${node.title}`,
    });
    node.children
      .sort((a, b) => a.title.localeCompare(b.title)) // сортировка по алфавиту
      .forEach(child => traverse(child, level + 1));
  }

  roots
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach(root => traverse(root));

  return result;
}