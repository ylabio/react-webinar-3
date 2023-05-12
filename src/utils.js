const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

const pr = new Intl.PluralRules("en-US", { type: "ordinal" });

const suffixes = new Map([
  ["one", "раз"],
  ["two", "раза"],
  ["few", "раза"],
  ["other", "раз"],
]);
export const formatOrdinals = (n) => {
  const rule = pr.select(n);
  let suffix = suffixes.get(rule);
  if (String(n).at(-1) === '4' && String(n).at(-2) !== '1') {
    suffix = 'раза';
  }
  return `${n} ${suffix}`;
};