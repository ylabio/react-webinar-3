const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */

export const enumLinkWord = (number, word1, word2) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return word1;
  }
  n %= 10;
  if (n === 1) {
    return word1;
  }
  if (n >= 2 && n <= 4) {
    return word2;
  }
  return word1;
}

/**
 * Создание элемента со свойствами и вложенными элементами
 * @returns {number}
 */