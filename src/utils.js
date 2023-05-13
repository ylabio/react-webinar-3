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

// Функция для плюрализации
export function pluralization(number, [firstForm, secondForm]) {
  const prelastChars = Number(number.toString().slice(-2));
  if (prelastChars > 10 && prelastChars < 20) return firstForm;
  const lastChar = Number(number.toString().slice(-1));
  return [2, 3, 4].includes(lastChar) ? secondForm : firstForm;
}
