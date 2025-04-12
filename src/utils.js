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
 * Преобразует массив элементов с родительскими связями в массив,
 * где вложенность отображается через дефисы (`-`) перед названием.
 * @param {Array<Object>} items - Исходный массив элементов.
 * @param {number|null} parentId - ID родителя, для которого ищутся дети.
 * @param {number} level - Текущий уровень вложенности (0 для корня, 1 для `-`, 2 для `- -` и т.д.).
 * @returns {Array<Object>} - Массив объектов с полями `value` и `title`.
 */
export const getSelectOptions = (items, parentId = null, level = 0) => {
  const options = [];

  for (const item of items) {
    const isRootNode = item.parent === null && parentId === null; // является ли элемент корневым
    const isDirectChild = item.parent && item.parent._id === parentId; //является ли элемент непосредственным потомком

    if (isRootNode || isDirectChild) {
      // Добавляем элемент с отступом
      const prefix = level > 0 ? '- '.repeat(level) : '';
      options.push({
        value: item._id,
        title: prefix + item.title,
      });

      // Рекурсивно добавляем детей (увеличивая уровень вложенности)
      const childOptions = getSelectOptions(items, item._id, level + 1);
      options.push(...childOptions);
    }
  }

  return options;
};

/**
 * Получить значение из localStorage
 * @param {string} key - Ключ
 * @returns {string} - Значение из localStorage или defaultValue
 */
export const getFromLS = key => JSON.parse(localStorage.getItem(key))

/**
 * Удалить значение из localStorage
 * @param {string} key - Ключ
 * @returns {string} - Значение из localStorage или defaultValue
 */
export const deleteFromLS = key => void localStorage.removeItem(key)

/**
 * Сохранить значение в localStorage
 * @param {string} key - Ключ
 * @param {string} value - Значение для сохранения
 */
export const saveToLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));
