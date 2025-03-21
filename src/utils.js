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
 * Возвращает правильное окончание для слова "раз" в зависимости от числа
 * @param count {number} количество выделений
 * @returns {string} правильное окончание слова "раз"
 */
export function getWordEnding(count) {
  const ending = 'раз';
  if (count % 100 >= 11 && count % 100 <= 19) {
    return ending;
  }
  return (count % 10 === 2 || count % 10 === 3 || count % 10 === 4) ? `${ending}а` : ending;
}

