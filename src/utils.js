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
 * Возвращает слово в правильной форме в зависимости от числа.
 *
 * @param {number} number - Число, с которым согласуется слово.
 * @param {string} singular - Форма единственного числа (именительный падеж).
 * @param {string} genitiveSingular - Форма родительного падежа единственного числа.
 * @param {string} genitivePlural - Форма родительного падежа множественного числа.
 * @returns {string} Строка с числом и правильной формой слова.
 */

export const pluralizeRu = (number, singular, genitiveSingular, genitivePlural) => {
  if (number % 100 >= 11 && number % 100 <= 14) {
    return `${number} ${genitivePlural}`;
  } else if (number % 10 === 1) {
    return `${number} ${singular}`;
  } else if (number % 10 >= 2 && number % 10 <= 4) {
    return `${number} ${genitiveSingular}`;
  } else {
    return `${number} ${genitivePlural}`;
  }
}
