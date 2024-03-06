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
 * Создание функции для форматирования строчного вывода больших чисел с заданным
 * разделителем через каждые 3 порядка. Допустимы отрицательные и дробные чмсла.
 * @param number {Number} - форматируемое число.
 * @param fix {Number} - Выводимое количество фиксированных дробных знаков.
 * @param sign {String} - Выводимый разделитель дробной части.
 * @param separator {String} - Выводимый разделитель разрядов.
 * @returns {String}
 */
export const formatNumber = (number, fix = 0, sign = '.', separator = ' ') => {

  if (typeof number !== 'number') throw new Error('Only numbers are allowed!');

  const minus = number < 0 ? '-' : '';
  const float = number.toFixed(fix).replace('-', '');
  const [integer, decimal] = float.split('.');
  const tail = decimal ? sign + decimal : '';

  function separate(str) {
    const result = str.slice(-3);
    return result.length < 3
      ? result
      : separate(str.slice(0, -3)) + separator + result;
  }
  return minus + separate(integer) + tail;
}