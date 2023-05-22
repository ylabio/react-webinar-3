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
 * Thousand separator
 * @param num {number} number
 * @returns {string} initial number as string with space separated thousands
 */
export function thousSeparator(num) {
  const strArr = (num.toString()).split('.'); // keep decimal part
  const separations = Math.floor((strArr[0].length - 1) / 3); // calculating amount of separations needed
  if (strArr[0] && separations > 0 ) {
    for (let i = 1; i <= separations; i++) {
      const pos = -(i*4 - 1); // position to slice on each iteration
      strArr[0] = strArr[0].slice(0, pos) + ' ' + strArr[0].slice(pos); // inserting space at desired position
    }
    return strArr.join('.');
  }
  return num.toString();
}

/**
 * Total value of all items in the cart
 * 
 * @param list {array} of items in the cart
 * @returns {number}
 */
export function calcCartSum(list) {
  if (list.length < 1) return 0;

  return list.reduce((sum, cur) => sum + (cur.price * cur.count), 0);
}

/**
 * Total count of items in the cart
 * 
 * @param list {array} of items in the cart
 * @returns {number}
 */
export function calcCartTotalCount(list) {
  if (list.length < 1) return 0;

  return list.reduce((sum, cur) => sum + cur.count, 0);
}