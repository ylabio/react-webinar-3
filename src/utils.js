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
  const exclusions = [12, 13, 14];
  const isFirstExclusion = !(exclusions.includes(clickedCount));

  const stringified = clickedCount.toString();
  const lastDigit = stringified.charAt(stringified.length - 1);
  const isSecondExclusion = (lastDigit === '2' || lastDigit === '3' || lastDigit === '4');

  if (isFirstExclusion && isSecondExclusion) {
    return `Выделяли ${clickedCount} раза`;
  }
  return `Выделяли ${clickedCount} раз`;
}

export function* generateCode (start) {
  let i = start;
  while (true) {
    yield i += 1;
  }
}
