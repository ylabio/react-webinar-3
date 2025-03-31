/**
 * Плюрализация.
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {*|string}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  const key = new Intl.PluralRules(locale).select(value);
  return variants[key] || '';
}

/**
 * Перевод числа в строку с разбиением на разряды.
 * Возвращает вариант числа с разделителями по разрядам под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @returns {string}
 */
export const formattedNumber = (value) => new Intl.NumberFormat('ru-RU').format(value);

/**
 * Генератор чисел с шагом 1
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const incrementer = (function (start = 0) {
  return () => ++start;
})();

export const cartButtonLabel = (sizeCart, total)=> {
  let cartBtnLabel = "Пусто";

  if (sizeCart > 0) {
    const pluralForm = plural(sizeCart, {
      one: 'товар',
      few: 'товара',
      many: 'товаров',
    });
    cartBtnLabel = `${sizeCart} ${pluralForm} / ${formattedNumber(total)} ₽`;
  }
  return cartBtnLabel;
};

