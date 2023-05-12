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

/**
 * Генерация рандомного значения id
 * @returns {Number}
 */
export const generateId = () => {
  const symbols = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];

  return symbols[randomNum(symbols.length-1)] +
      symbols[randomNum(symbols.length-1)] +
      randomNum(100) +
      symbols[randomNum(symbols.length-1)] +
      symbols[randomNum(symbols.length-1)];
}

/**
 * Генерация рандомного числа от 0 до заданного
 * @param max {Number} Больший предел
 * @returns {Number}
 */
export function randomNum(max) {
  return Math.ceil(Math.random()*max);
}