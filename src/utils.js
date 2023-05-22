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
 * Получение форматированной строки о текущем статусе Корзины
 * @param {Object} options - Объект, содержащий следующие свойства:
 * @param {number} options.length - Длина
 * @param {number} options.total - Общая стоимость товаров
 * @returns {string} Строка, описывающая статус корзины. Если корзина пуста, возвращает "пусто".
 */
export function formatCart({length, total}) {
  if (!length) {
    return "пусто"
  }

  return `${length} ${plural(length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${toLocaleCurrency(total)}`
}

/**
 * Форматирует числовое значение в валюту с использованием метода toLocaleString().
 * @param {number} value - Числовое значение для форматирования.
 * @param {string} [locale='ru-RU'] - Языковой код для форматирования. По умолчанию: 'ru-RU'.
 * @param {string} [currency='RUB'] - Код валюты для форматирования. По умолчанию: 'RUB'.
 * @returns {string} - Отформатированная строка с валютой.
 */
export function toLocaleCurrency(value, locale = 'ru-RU', currency = 'RUB') {
  return value.toLocaleString(locale, { style: 'currency', currency, minimumFractionDigits: 0 })
}