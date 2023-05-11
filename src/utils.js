const propNames = new Set(['id', 'className', 'textContent', 'onclick']);
let nextId = 1;

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
 * Склоение слов в зависимости от числа
 @param {number} n - число, по которому определяется форма слова
 @param {string[]} titles - массив форм слова, например: ['яблоко', 'яблока', 'яблок']
 @returns {string}
 */
export const declOfNum = (n, titles) => {
  return titles[
      n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
      ]
}

/**
 * Генерация уникального id
 * @returns {function} Функция для генерации уникальных идентификаторов.
 */
export function getUniqId() {
  const id = nextId;
  nextId += 1;
  return id;
}

