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

const makePlural = (dictionary) => (count) => {
  if (count >= 11 && count <= 20) {
    return dictionary['11-20'];
  }

  const ord = count % 10;

  if (ord === 2 || ord === 3 || ord === 4) {
    return dictionary['2-3-4'];
  }

  return dictionary['default'];
}

const DICTIONARY = {'2-3-4': 'раза', '11-20': 'раз', 'default': 'раз'};

export const plural = makePlural(DICTIONARY);
