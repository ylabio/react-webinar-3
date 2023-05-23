export function formatNumber(number) {
  return new Intl.NumberFormat('ru-RU').format(number);
}

/**
 * Генератор чисел с шагом 1
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
  return () => ++start;
}());

export const formatOrdinals = (n) => {
  const pr = new Intl.PluralRules("ru-RU");
  const suffixes = new Map([
    ["one", ""],
    ["few", "а"],
    ["many", "ов"],
  ]);
  const rule = pr.select(n);
  let suffix = suffixes.get(rule);
  return `${suffix}`;
};