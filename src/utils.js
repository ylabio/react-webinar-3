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
 * Форматирование категорий для отображения в выпадающем списке
 * @param categories {Array} Список категорий
 * @return {Array} Отформатированный список категорий
 */
export function formatCategories(categories) {
  // Создаем карту категорий для быстрого доступа по идентификатору
  const categoryMap = new Map(
    categories.map(category => [category._id, { ...category, children: [] }]),
  );

  // Строим иерархию категорий, добавляя каждую категорию к своему родителю
  categories.forEach(category => {
    if (category.parent) {
      const parent = categoryMap.get(category.parent._id);
      if (parent) {
        parent.children.push(categoryMap.get(category._id));
      }
    }
  });

  const result = [];

  // Рекурсивное форматирование категорий в плоский список с дефисами
  function formatCategory(category, level = 0) {
    const title = '-'.repeat(level) + category.title;
    result.push({ value: category._id, title });
    category.children.forEach(child => formatCategory(child, level + 1));
  }

  // Находим корневые категории (те, у которых нет родителя)
  const rootCategories = [...categoryMap.values()].filter(category => !category.parent);

  // Форматируем каждую корневую категорию
  rootCategories.forEach(rootCategory => formatCategory(rootCategory));

  return result;
}
