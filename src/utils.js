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

export function getPluralForm(n) {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return 'раз';

  const lastOne = n % 10;
  switch(lastOne) {
    case 1: return 'раз';
    case 2:
    case 3:
    case 4: return 'раза';
    default: return 'раз';
  }
}
