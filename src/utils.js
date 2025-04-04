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
// Пагинация

export function returnPaginationRange(totalItem = 250, page = 1, limit = 10, siblings = 1) {
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };
  const totalPage = Math.ceil(totalItem / limit);

  const totalPageNoInArray = 1 + siblings;
  if (totalPageNoInArray >= totalPage) {
    return range(1, totalPage + 1);
  }
  const leftSiblingsIndex = Math.max(page - siblings, 1);
  const showLeftDots = leftSiblingsIndex > 1;

  const rightSiblingsIndex = Math.min(page + siblings, totalPage);
  const showRightDots = rightSiblingsIndex < totalPage;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 1 * siblings;
    const leftRange = range(1, leftItemsCount + 2);
    return [...leftRange, '...', totalPage];
  } else if (showLeftDots && !showRightDots) {
    const rightItemsCount = 1 * siblings;
    const rightRange = range(totalPage - rightItemsCount - 1, totalPage);
    return [1, '...', ...rightRange];
  } else {
    const middleRange = range(leftSiblingsIndex, rightSiblingsIndex);
    return [1, '...', ...middleRange, '...', totalPage];
  }
}
// Перевод
export const translate = {
  ru: {
    headTitle: 'Магазин',
    basketToolNav: 'Главная',
    basketToolAction: 'Пусто',
    modalLayoutTitle: 'Корзина',
    basketTotal: 'Итого',
    buttonAdd: 'Добавить',
    buttonRemove: 'Удалить',
    madeIn: 'Страна производитель',
    category: 'Категория',
    edition: 'Год выпуска',
    price: 'Цена',
    amount: 'шт',
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  },
  en: {
    headTitle: 'Store',
    basketToolNav: 'Home',
    basketToolAction: 'Empty',
    modalLayoutTitle: 'Basket',
    basketTotal: 'Total',
    buttonAdd: 'Add',
    buttonRemove: 'Remove',
    madeIn: 'Made in',
    category: 'Category',
    edition: 'Edition',
    price: 'Price',
    amount: 'pcs',
    one: 'item',
    few: 'items',
    many: 'items',
  },
};
