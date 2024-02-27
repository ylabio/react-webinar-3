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

export function createCode(inputCode) {
  const uniqueCode = Math.random(inputCode);
  return uniqueCode;
}

export function getInflection(number, str1, str2) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 21) {
    return str1;
  } else {
    n %= 10;
    if (n >= 2 && n <= 4) {
      return str2;
    } else return str1;
  }
}
