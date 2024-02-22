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
};

export function formatted( number, word='раз' ) {
  if ( number % 10 === 0 || number % 10 === 1 ) {
    return word;
  } else if ( (number % 100 >= 5 && number % 100 <= 20)
    || (number % 10 >= 5 && number % 10 <= 9) ) {
        return word;
      } else {
        return word + 'а';
      }
};
