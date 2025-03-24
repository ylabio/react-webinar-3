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

export function getPluralInfo(number) {
  const certainNumbers = [2, 3, 4]; //будем сравнивать последнюю цифру number с этими числами
  const exceptions = [12, 13, 14]; //исключения для двух последних цифр
  const lastTwoDigits = number % 100;
  const lastDigit = number % 10;
  if (certainNumbers.includes(lastDigit) & !exceptions.includes(lastTwoDigits)) {
    return `${number} раза`;
  }
  return `${number} раз`;
}
