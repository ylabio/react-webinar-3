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
 * Создание строки Выделили n раз, с учетом склонения
 * @param count {Number} Число выделений
 * @returns {String}
 */
export function getCountString(count) {
  const lastDigit = count % 10;
  const countString =
    (count < 10 || count > 20) && [2, 3, 4].includes(lastDigit)
      ? 'раза'
      : 'раз';
  return `Выделили ${count} ${countString}`;
}
