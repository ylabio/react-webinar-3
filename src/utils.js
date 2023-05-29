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

export function getRange(min, max) {
  var range = [];

  for (var i = min; i < max; i++) {
    range.push(i);
  }

  return range;
}

export function returnPaginationRange(totalPage, page = 1, siblings) {
  if (totalPage < 5) {
    return [...getRange(1, totalPage + 1)]
  }
  if (page === 3) {
    return [...getRange(1, 5), " ...", totalPage]
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rigthSiblingsIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rigthSiblingsIndex <= totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 1 + 2 * siblings;
    let leftRange = getRange(1, leftItemsCount + 1)
    return [...leftRange, " ...", totalPage]
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 2 + 2 * siblings;
    let rightRange = getRange(totalPage - rightItemsCount + 1, totalPage + 1);
    return [1, " ...", ...rightRange];
  } else {
    let middleRange = getRange(leftSiblingsIndex, rigthSiblingsIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPage]
  }
}

const translations = {
  en: {
    cart: 'In the basket',
    main: 'Main',
    Магазин: 'Shop',
    пусто: 'empty',
    go: 'Go',
    add: 'Add',
    dell: 'Delete',
    close: 'Close',
    total: 'Total',
    Корзина: 'Shopping Cart',
    country: 'Country of origin',
    category: 'Category',
    year: 'Year of release',
    price: 'Price',
  },
  ru: {
    cart: 'В корзине',
    main: 'Главная',
    Магазин: 'Магазин',
    пусто: 'пусто',
    go: 'Перейти',
    add: 'Добавить',
    dell: 'Удалить',
    close: 'Закрыть',
    total: 'Итого',
    Корзина: 'Корзина',
    country: 'Страна производитель',
    category: 'Категория',
    year: 'Год выпуска',
    price: 'Цена'
  },
};

export function translate(lang, keyName) {
  return translations[lang][keyName] || keyName
}
