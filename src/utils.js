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

export const createateUniqueId = (() => {
  let count = 1;
  return () => count++;
})();

export function getCountLabel(count, wordForms) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  // Если число заканчивается на 1, но не на 11, используем "раз"
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return wordForms[0]; // "раз"
  }
  // Если число заканчивается на 2, 3 или 4, но не на 12, 13, 14, используем "раза"
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return wordForms[1]; // "раза"
  }
  // Во всех остальных случаях используем "раз"
  return wordForms[0]; // "раз"
}
