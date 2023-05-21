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
 * Создание строки Выделили n раз, с учетом склонения
 * @param count {Number} Число выделений
 * @returns {String}
 */
export function getCountString(count) {
  const lastDigit = count % 10;
  const countString =
    (count < 10 || count > 20) && [2, 3, 4].includes(lastDigit)
      ? "раза"
      : "раз";
  return `Выделили ${count} ${countString}`;
}

/**
 * Форматирование строки по 3 символа
 * @param value {Nuber} Цена
 * @param dimension {String} Измерение (р, шт..)
 * @returns {String}
 */
export function formatText(value, dimension) {
  const st = String(value)
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)
    .map((group) => group.split("").reverse().join(""))
    .reverse()
    .join(" ");

  return `${st} ${dimension}`;
}
