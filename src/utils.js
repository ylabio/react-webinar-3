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

/**
 * Вычисляет общую стоимость всех товаров в корзине
 * Суммирует произведения цены каждого товара на его количество
 * @param {Array<Object>} cart - Массив товаров в корзине
 * @param {Number} cart[].price - Цена товара
 * @param {Number} cart[].quantity - Количество товара
 * @returns {Number} Общая стоимость всех товаров в корзине
 * @example
 * const cart = [
 *   { price: 100, quantity: 2 },
 *   { price: 200, quantity: 1 }
 * ];
 * calculateCartTotal(cart); // 400
 */
export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0);
};