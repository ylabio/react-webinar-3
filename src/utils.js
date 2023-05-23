export const generateCode = (function (start = 0) {
  return () => ++start;
}());

export function Sum_total(arr) {
  return arr.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
export const Plurals = (n) => {
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

export function Format_Price(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}
