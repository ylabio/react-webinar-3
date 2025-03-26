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
export const formatPrice = (price, locales, mark) => {
  return new Intl.NumberFormat(locales, {style: "decimal"}).format(price) + ` ${mark}`;
}
