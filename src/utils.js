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
  const integerValue = Math.floor(value);
  const formatted = new Intl.NumberFormat(locale, options).format(integerValue);
  // console.log(formatted);
  return formatted;
}

export const translations = {
  ru: {
    home: 'Главная',
    basket: 'Корзина',
    add: 'Добавить',
    remove: 'Удалить',
    close: 'Закрыть',
    shop: 'Магазин',
    total: 'Итого',
    language: 'Язык',
    ru: 'Русский',
    en: 'English',
    country: 'Страна производитель',
    category: 'Категория',
    year: 'Год выпуска',
    price: 'Цена',
    itemOne: 'товар',
    itemFew: 'товара',
    itemMany: 'товаров',
    empty: 'Пусто',
    loading: 'Загрузка...',
  },
  en: {
    home: 'Home',
    basket: 'Cart',
    add: 'Add',
    remove: 'Remove',
    close: 'Close',
    shop: 'Shop',
    total: 'Total',
    language: 'Language',
    ru: 'Russian',
    en: 'English',
    country: 'Country of origin',
    category: 'Category',
    year: 'Release year',
    price: 'Price',
    itemOne: 'item',
    itemFew: 'items',
    itemMany: 'items',
    empty: 'Empty',
    loading: 'Loading...',
  },
};
