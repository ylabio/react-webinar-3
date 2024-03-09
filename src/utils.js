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
export function numberFormat(value, locale = 'ru-RU', options = {minimumFractionDigits: 2}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function getTranslater(lang) {
  const dictionary = {
    'en': {
      'Магазин': 'Store',
      'Корзина': 'Basket',
      'Главная': 'Main',
      'В корзине:': 'In basket:',
      'пусто': 'empty',
      'Добавить': 'Add',
      'Удалить': 'Remove',
      'Перейти': 'Go',
      'Закрыть': 'Close',
      'Итого': 'Total',
      'Страна производитель:': 'Made in:',
      'Категория:': 'Category:',
      'Год выпуска:': 'Year of prodaction:',
      'Цена:': 'Price',
      'товар': 'product',
      'товара': 'products',
      'товаров': 'products',
      'English': 'Русский',
    },
  }

  return (text) => lang === 'ru' ? text : dictionary[lang][text];
}
