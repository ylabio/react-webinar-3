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

export function getWordForm (count, wordForms) {
      if (typeof wordForms === 'string') {
          wordForms = wordForms.split(',');
      }
      const [single, twoFour, many] = wordForms;
         count%= 100; // забираем только остаток от деления на 100
       if (count >= 10 && count <=20) {
           return many;
       }
       count %= 10; // забираем только остаток от деления на 10
       if (count === 1) { return single; }
       else if (count === 0 || count > 4) { return many; }
       else { return twoFour; }
}
