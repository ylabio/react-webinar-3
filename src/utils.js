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
 * Форматирует число в строковое валютное значение
 * @param {Number} value - число
 * @param {String} [currency="RUB"] - валюта (RUB, USD, ...). По умолчанию "RUB"
 * @param {String} [locale="ru-RU"] - локаль (ru-RU, en-EN). По умолчанию "ru-RU"
 * @returns {String}
 */
export function monefy(value, currency = "RUB", locale = "ru-RU") {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });

  return formatter.format(value);
}

/**
 * Суммирует цены продуктов в списке
 * @param {Array.<{price: Number, count: Number}>} productsList
 * @returns {Number}
 */
export function sumPrices(productsList) {
  return productsList.reduce((sum, product) => {
    return sum + product.price * product.count;
  }, 0);
}
