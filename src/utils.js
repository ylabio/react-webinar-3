/**
 * Генератор чисел с шагом 1
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
  return () => ++start;
})();

/**
 * Форматирует число в денежный формат с учётом русской локали
 * Вариант с использованием Intl.NumberFormat для корректного отображения валюты.
 * @param {Number} price - Числовое значение цены для форматирования
 * @returns {String} Строка с отформатированной ценой и символом рубля
 * @example formatPrice(1000) // "1 000 ₽"
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price);
};

