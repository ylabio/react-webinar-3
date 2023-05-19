/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {*|string}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
}

/**
 * Возвращает отформатированное число, учитывая страну и другие параметры
 * @param {Number} value - Число для форматирования
 * @param {Object} options - Настройки форматирования. Подробнее в документации Intl Api
 * @param {String} locale - Локаль (код языка)
 * @example formatNumbers(7000) => '7 000'
 * formatNumbers(7000, {}, 'en') => '7,000'
 * formatNumbers(7000, {style: 'currency', currency: 'USD'}, 'en') => '$7,000.00'
 * @returns {String}
 */
export function formatNumbers(value, options, locale) {
  return new Intl.NumberFormat(locale, options).format(value);
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
})();

/**
 * Генератор чисел с шагом 1
 * Вариант с использованием функции как объекта для хранения значения value
 * @returns {Number}
 */
export function generateCode2() {
  return generateCode2.value
    ? ++generateCode2.value
    : (generateCode2.value = 1);
}

/**
 * Считает все поля price объектов в массиве basket. Также учитывается поле count
 * @param {Array} basket
 * @example countAllPrices([
 * {price: 100},
 * {price: 120},
 * {price: 130}
 * ])
 * => 350

 * countAllPrices([
 * {price: 100, count: 2},
 * {price: 120, count: 3},
 * {price: 130}
 * ])
 * => 690
 * @returns {Number}
 */
export function countAllPrices(basket) {
  return basket.reduce((acc, currentItem) => {
    if (currentItem.count > 1) {
      return acc + currentItem.price * currentItem.count;
    }

    return acc + currentItem.price;
  }, 0);
}
