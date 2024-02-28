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

export function generateClickedCountText(clickedCount) {
  const stringified = clickedCount.toString();
  const lastTwoDigits = parseInt(stringified.slice(-2));
  const lastDigit = parseInt(stringified.charAt(stringified.length - 1));

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `Выделяли ${clickedCount} раз`;
  }

  switch (lastDigit) {
    case 2:
    case 3:
    case 4:
      return `Выделяли ${clickedCount} раза`;
    default:
      return `Выделяли ${clickedCount} раз`;
  }
}

export function* generateCode (start) {
  let i = start;
  while (true) {
    yield i += 1;
  }
}
