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
  return generateCode2.value ? ++generateCode2.value : (generateCode2.value = 1);
}

/**
 * @deprecated теперь эти данные хранятся и обрабатываются в Store
 * Вычисляет статистику корзины: общую стоимость и количество уникальных товаров.
 * @param cart {Array<Object>} - Список товаров в корзине.
 * @example getCartStats([{ code: 1, title: 'Название товара', price: 100, cartQuantity: 2 },])
 * @returns {{ totalCost: number, uniqueItems: number }} - Объект с общей стоимостью и количеством уникальных товаров.
 */
export const getCartStats = (cart) => {
  return cart.reduce(
    (acc, item) => {
      if (item.cartQuantity) {
        acc.totalCost += item.price * item.cartQuantity;
        acc.uniqueItems++;
      }
      return acc;
    },
    { totalCost: 0, uniqueItems: 0 },
  );
};

/**
 * Форматирование числа в соответствии с языковыми правилами
 * @param {Number} value - Число для форматирования
 * @param {String} locale - Локаль для форматирования
 * @param {Object} options - Дополнительные параметры форматирования
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options Подробнее о параметрах форматирования}
 * @returns {String} Отформатированная строка числа
 */
export const numberFormat = (value, locale = 'ru-RU', options = {}) => {
  return new Intl.NumberFormat(locale, options).format(value);
};

