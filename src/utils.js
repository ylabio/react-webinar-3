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
export function numberFormat(value, locale = 'ru-RU', options) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export const translateDictionary = {
  ru: {
    Store: 'Магазин',
    Home: 'Главная',
    Open: 'Перейти',
    Add: 'Добавить',
    Close: 'Закрыть',
    Delete: 'Удалить',
    ManufacturerСountry: 'Страна производитель',
    Category: 'Категория',
    YearOfManufacture: 'Год выпуска',
    Price: 'Цена',
    InCart: 'В корзине',
    Empty: 'Пусто',
    Total: 'Итого',
    OneProduct: 'товар',
    FewProducts: 'товара',
    ManyProducts: 'товаров',
    Pcs: 'шт.',
    Cart: 'Корзина'
  },
  en: {
    Store: 'Store',
    Home: 'Home',
    Open: 'Open',
    Add: 'Add',
    Close: 'Close',
    Delete: 'Delete',
    ManufacturerСountry: 'Manufacturer country',
    Category: 'Category',
    YearOfManufacture: 'Year of manufacture',
    Price: 'Price',
    InCart: 'In cart',
    Empty: 'Empty',
    Total: 'Total',
    OneProduct: 'product',
    FewProducts: 'products',
    ManyProducts: 'products',
    Pcs: 'pcs.',
    Cart: 'Cart'
  },
};