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

export function pluralize(count) {

  let str = count.toString()

  const lastTwoDigits = str.slice(-2)

  if (str.length >= 2 && lastTwoDigits[0] == 1) {
    return 'раз'
  } else {
    const lastDigit = str.slice(-1)

    switch (lastDigit) {
      case '0':
      case '1':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return 'раз'
      case '2':
      case '3':
      case '4':
        return 'раза'
    }
  }
}
