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
 * Функция для плюрализации слова "раз" по числу
 * @param {number} count - число, определяющее форму слова
 * @returns {string} - плюрализованное слово "раз" с числом
 */
export function pluralizeTimes(count) {
  const lastTwoDigits = count % 100;
  const lastDigit = lastTwoDigits % 10;

  if (lastDigit === 1) {
    return 'раз';
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return 'раза';
  } else {
    return 'раз';
  }
}
