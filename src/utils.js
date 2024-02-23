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
 * Склонение числа
 * @param number {Number} количество выделений записи
 * @param words {String[]} Массив вариантов склонения из 2 элементов
 * @returns {String} Один из вариантов склонения
 */

export function declensionOfNumber(number, words) {
  if (number % 100 > 10 && number % 100 < 20) {
    return words[0];
  } else {
    switch (number % 10) {
        case 2:
        case 3:
        case 4:
            return words[1];
        default:
            return words[0];
    }
  }
}