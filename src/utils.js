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

// добавляет "-" в зависимости от количества родителей
export function modifyCategoryItems(items) {
  const hashTable = new Map();
  const newItems = [];

  // Создаем хэш-таблицу, где ключ - это _id элемента, а значение - сам элемент
  items.forEach((item) => hashTable.set(item._id, item));

  for (let i = 0; i < items.length; i++) {
    const currentItem = items[i];

    if (currentItem.parent && currentItem.parent._id) {
      let parentCount = 1;
      let currentParentID = currentItem.parent._id;

      while (hashTable.has(currentParentID)) {
        const parentItem = hashTable.get(currentParentID);

        if (parentItem && parentItem.parent && parentItem.parent._id) {
          parentCount++;
          currentParentID = parentItem.parent._id;
        } else {
          currentParentID = null;
        }
      }

      // Добавляем знак "-" для каждого родительского уровня
      currentItem.title = "- ".repeat(parentCount) + currentItem.title;

      // Находим индекс родительского элемента
      const parentIndex = newItems.findIndex(
        (element) => element._id === currentItem.parent._id
      );

      // Добавляем текущий элемент после его родителя
      newItems.splice(parentIndex + 1, 0, currentItem);
    } else {
      // Добавляем элемент в начало нового массива
      newItems.unshift(currentItem);
    }
  }

  return newItems;
}