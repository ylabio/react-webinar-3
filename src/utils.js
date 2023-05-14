const propNames = new Set(['id', 'className', 'textContent', 'onclick']);
const codesSet = new Set();
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


export function editTime(number) {
  if (number > 10 && [11, 12, 13, 14].includes(number%100)) return `${number} раз`;
  let last_num = number%10;
  if (last_num == 1) return `${number} раз`;
  if ([2,3,4].includes(last_num)) return `${number} раза`;
  if ([5,6,7,8,9, 0].includes(last_num)) return `${number} раз`;
}