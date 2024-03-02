import { RUR } from "./constants/currency-signs";

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

/**
 * Форматирование числа
 * Возвращает вариант с учётом указанной локали.
 * @param price {Number} Число, под которое выбирается вариант формы.
 * @param locale {String} Локаль (код языка).
 * @returns {string}
 */
export function formatPrice(price, locale = 'ru-RU') {
  return new Intl.NumberFormat(locale).format(price);
}

/**
 * Подсчёт стоимости товаров
 * Возвращает общую стоимость всех товаров
 * @param array {Object} Массив объектов с полями price и amount.
 * @returns {Number}
 */
export function getSum(array) {
  return array.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
}

/**
 * Подсчёт количества товаров
 * Возвращает строку с количеством всех товаров с учётом правил множественного числа.
 * @param array {Object} Массив объектов с полями amount.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @returns {string}
 */
export function getAmount(array, variants) {
  const amount = array.reduce((acc, curr) => acc + curr.amount, 0);

  return `${amount} ${plural(amount, variants)}`;
}

/**
 * Получение форматированной цены
 * Возвращает строку цены с символом валюты.
 * @param price {Number} Число, которое будет форматировано.
 * @returns {string}
 */
export function getPrice(price) {
  return `${formatPrice(price)} ${RUR}`
}

/**
 * Получение нового объекта товара
 * Возвращает объект из массива с полем amount
 * @param list {Object} Массив товаров.
 * @param code {Number} Идентификатор.
 * @returns {Object}
 */
export function getNewItem(list, code) {
  return {
    ...list.find(item => item.code === code),
    amount: 1,
  }
}
