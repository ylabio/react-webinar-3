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
 * Преобразует массив категорий в массив для использования в select-компоненте
 * @param {Array} categories - Массив категорий с полями _id, title и parent
 * @param {Number} [level=0] - Уровень вложенности (используется для рекурсивных вызовов)
 * @returns {Array} Массив объектов {value: String, title: String} с отображением вложенности через дефисы
 * @example
 * // Возвращает:
 * // [
 * //   {value: '1', title: 'Электроника'},
 * //   {value: '2', title: '- Телефоны'},
 * //   {value: '3', title: '-- Смартфоны'}
 * // ]
 * categoriesToSelectOptions([
 *   {_id: '1', title: 'Электроника', parent: null},
 *   {_id: '2', title: 'Телефоны', parent: {_id: '1'}},
 *   {_id: '3', title: 'Смартфоны', parent: {_id: '2'}}
 * ]);
 */
export function categoriesToSelectOptions(categories) {
  const result = [{ value: '', title: 'Все' }];

  // Строим дерево категорий
  const tree = {};
  const roots = [];

  categories.forEach(cat => {
    tree[cat._id] = { ...cat, children: [] };
  });

  categories.forEach(cat => {
    if (cat.parent && cat.parent._id) {
      tree[cat.parent._id]?.children.push(tree[cat._id]);
    } else {
      roots.push(tree[cat._id]);
    }
  });

  // Рекурсивное добавление в результат
  const addToResult = (category, level = 0) => {
    result.push({
      value: category._id,
      title: `${'– '.repeat(level)}${category.title}`,
    });

    category.children.forEach(child => addToResult(child, level + 1));
  };

  roots.forEach(root => addToResult(root));

  return result;
}

/**
 * Валидация и выбор сообщения об ошибке на основе приоритета
 * @param str1 {String} - основное сообщение об ошибке (проверяемое условие)
 * @param str2 {String} - альтернативное сообщение (используется при выполнении условия)
 * @returns {String} - выбранное сообщение об ошибке
 */
export function validErrorMessage(str1, str2) {
  if (str1 === 'Incorrect data') {
    return str2;
  } else {
    return str1;
  }
}

/**
 * Находит название категории по её ID
 * @param {string} categoryId - ID искомой категории
 * @param {Array} categories - Массив категорий вида {_id: string, title: string, parent?: {...}}
 * @returns {string} Название категории или пустая строка, если не найдено
 */
export function getCategoryTitleById(categoryId, categories) {
  if (!categoryId || !Array.isArray(categories)) return '';

  const category = categories.find(cat => cat._id === categoryId);
  
  return category ? ` / ${category.title}` : '';
}