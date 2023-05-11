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

export function getWordForm(number, word = 'раз') { // Функция, которая определяет окончание
  const lastDigit = number % 10;
  const lastTwoDigit = number % 100;

  if (lastTwoDigit >= 12 && lastTwoDigit <= 14) {
    return word;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return word + 'а';
  }
  return word;
}
