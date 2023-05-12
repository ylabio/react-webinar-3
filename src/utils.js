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
 * Склонение счетчика выделений
 * @param counter {Number} Значение счетчика
 * @returns {String}
 */
export function counterWord(counter){  
  if ([12, 13, 14].includes(counter)) {
    return `${counter} раз`;
  }
  else if ([2, 3, 4].includes(counter % 10)) {
    return `${counter} раза`;
  }
  return `${counter} раз`;
}