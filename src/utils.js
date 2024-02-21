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

export function endingOfWord(num, forms) {
  // Падеж необходимо определять в зависимости от последней (последних двух) цифры пришедшего к нам числа, поэтому необходимо её найти
  let numToString = num.toString();
  let lastNumber = numToString.slice(-1);
  let twoLastNumber = numToString.slice(-2);

  if (
    numToString.length >= 2 &&
    ['11', '12', '13', '14'].includes(twoLastNumber)
  ) {
    return `${num} ${forms[2]}`;
  }
  if (lastNumber === '1') {
    return `${num} ${forms[0]}`;
  }
  if (lastNumber >= '2' && lastNumber <= '4') {
    return `${num} ${forms[1]}`;
  }
  return `${num} ${forms[2]}`;
}
