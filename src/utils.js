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

export function generateUniqueNumber() {
  const generatedNumbers = new Set();

  return function () {
    let num;

    do {
      num = Math.floor(Math.random() * 10000) + 1;
    } while (generatedNumbers.has(num));

    generatedNumbers.add(num);

    return num;
  };
}

function normalize(number, words) {
  const options = [2, 0, 1, 1, 1, 2];

  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : options[number % 10 < 5 ? number % 10 : 5]
  ];
}

export function normalizeQuantity(quantity) {
  return normalize(quantity, ['раз', 'раза', 'раз']);
}
