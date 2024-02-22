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
 * Возвращает строку вида "${pref}1 раз", "${pref}3 раза"
 * @param num {Number}
 * @param pref {String}
 * @returns {String}
 */
export function numberOfSelectionPhrase(num, pref=' | Выделяли ') {
  if (num === undefined || num === 0) {
    return ''
  }
  const lastChar = num.toString().slice(-1)
  if (lastChar === '2' || lastChar === '3' || lastChar === '4') {
    return `${pref}${num} раза`
  }
  return `${pref}${num} раз`
}
