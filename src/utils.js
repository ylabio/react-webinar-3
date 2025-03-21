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
 * Возвращает соответствующее слово в зависимости от числа
 * @param count {number} число
 * @param endings {string[]} массив из трёх вариантов слов
 * @returns {string}
 */
export function getWordEnding(count, endings) {
  if (count % 100 >= 11 && count % 100 <= 19) {
    return endings[2];
  }
  const lastDigit = count % 10;
  if (lastDigit === 1) {
    return endings[0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return endings[1];
  } else {
    return endings[2];
  }
}
