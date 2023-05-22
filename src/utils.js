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

export function addSpaceToNumber(number) {
  let str = String(number);
  let formattedNumber = str;

  if (str.length === 4) {
    formattedNumber = str.slice(0, 1) + " " + str.slice(1);
  } else if (str.length === 6) {
    formattedNumber = str.slice(0, 3) + " " + str.slice(3);
  } else if (str.length === 7) {
    formattedNumber =
      str.slice(0, 1) + " " + str.slice(1, 4) + " " + str.slice(4);
  } else if (str.length === 8) {
    formattedNumber =
      str.slice(0, 2) + " " + str.slice(2, 5) + " " + str.slice(5);
  } else if (str.length === 9) {
    formattedNumber =
      str.slice(0, 3) + " " + str.slice(3, 6) + " " + str.slice(6);
  } else if (str.length === 10) {
    formattedNumber =
      str.slice(0, 1) +
      " " +
      str.slice(1, 4) +
      " " +
      str.slice(4, 7) +
      " " +
      str.slice(7);
  } else if (str.length === 11) {
    formattedNumber =
      str.slice(0, 2) +
      " " +
      str.slice(2, 5) +
      " " +
      str.slice(5, 8) +
      " " +
      str.slice(8);
  } else if (str.length === 12) {
    formattedNumber =
      str.slice(0, 3) +
      " " +
      str.slice(3, 6) +
      " " +
      str.slice(6, 9) +
      " " +
      str.slice(9);
  }

  return formattedNumber;
}
