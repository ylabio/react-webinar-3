const propNames = new Set(["id", "className", "textContent", "onclick"]);

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

export function pluralize(number) {
  let str = {
    1: "раз",
    2: "раза",
  };
  if (number > 100) {
    number = number % 100;
  }
  if (number > 20) {
    number = number % 10;
  }

  if ([2, 3, 4].includes(number) && ![12, 13, 14].includes(number)) {
    return str[2];
  } else {
    return str[1];
  }
}
