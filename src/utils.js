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

export function getPluralForm(count) {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'раз';
  }
  if (lastDigit === 1) {
    return 'раз';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'раза';
  }
  return 'раз';
}
