/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {*|string}
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
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
  return () => ++start;
})();

/**
 * Форматирование числового значения, представляющего цену, в соответствии с заданными локалями
 * @param price {Number} Не отформатированная цена товара.
 * @param locales {String} Локаль для цены
 * @param mark {String} обозначение валюты цены
 * @returns {String}
 */
export const formatPrice = (price, locales, mark = '₽') => {
  return new Intl.NumberFormat(locales, {style: "decimal"}).format(price) + ` ${mark}`;
}

/**
 * Блок прокрутки страницы при открытии модального окна
 * @param isBlock {Boolean}
 */
export const addOverflowToBody = (isBlock) => {
  const body = document.body;
  if (isBlock) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}
