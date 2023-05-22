/**
 * Вычисление содержимого корзины
 * Возвращает строку типа "1 товар / 111 ₽"
 * @param cart {Array} Корзина.
 * @example calcCartAmount([{code: generateCode(), title: 'Карандаши цветные', price: 111, count: 1}])
 * @returns {string}
 */

// export function calcCartAmount(cart) {
//   const totalPrice = calcTotalPrice(cart);
//   const productsAmount = `${cart.length} ${plural(cart.length, {one: 'товар', few: 'товара', many: 'товаров'})}`;
//
//   return cart.length ? `${productsAmount} / ${totalPrice}` : 'пусто';
// }

/**
 * Вычисление окончательной цены всех товаров
 * Возвращает строку типа "111 ₽"
 * @param cart {Array} Корзина.
 * @example calcTotalPrice([{code: generateCode(), title: 'Карандаши цветные', price: 111, count: 1}])
 * @returns {string}
 */

// export function calcTotalPrice(cart) {
//   const totalPrice = cart.reduce((accumulator, item) => accumulator += item.price * item.count, 0);
//
//   return totalPrice;
// }

/**
 * Конвертация стоимости продукта
 * Возвращает строку с разделённым по разрядам числом и валютой
 * @param price {Number} Стоимость продукта.
 * @example convertPrice(14334)
 * @returns {string}
 */

export function convertPrice(price) {
  return new Intl.NumberFormat("ru", {
    style: "currency",
    maximumFractionDigits: 0,
    currency: "RUB"
  }).format(price)
}

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
}());

/**
 * Генератор чисел с шагом 1
 * Вариант с генератором.
 * Сразу создаётся генератор и возвращается функция для получения следующего значения генератора
 * @returns {Number}
 */
export const generateCode1 = (function (start = 0) {
  function* realGenerator(start) {
    while (true) {
      yield ++start;
    }
  }
  const gen = realGenerator(start);
  return () => gen.next().value;
}());

/**
 * Генератор чисел с шагом 1
 * Вариант с использованием функции как объекта для хранения значения value
 * @returns {Number}
 */
export function generateCode2() {
  return generateCode2.value ? ++generateCode2.value : generateCode2.value = 1;
}
