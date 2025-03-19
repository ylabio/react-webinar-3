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

export function plural(num, option1, option2, option3) {
  let n = num % 100;
  if (n >= 5 && n <= 20) {
    return ` ${num} ${option3}`;
  }
  n %= 10;
  if (n === 1) {
    return ` ${num} ${option1}`;
  }
  if (n >= 2 && n <= 4) {
    return ` ${num} ${option2}`;
  }

  return ` ${num} ${option1}`;
}
