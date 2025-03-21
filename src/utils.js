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

// Функция для склонения окончания слова "раз" в зависимости от числа перед ним

/**
 * @param number {Number} Число раз выделения записи
 * @returns {String}
 */
export function numWords(number) {
  let count = number % 100;

  if (count >= 5 && count <= 20) {
    return `${number} раз`;
  } else {
    count = count % 10;

    if (count >= 2 && count <= 4) {
      return `${number} раза`;
    } else {
      return `${number} раз`;
    }
  }
}
