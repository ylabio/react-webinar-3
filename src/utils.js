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
 * Генерация рандомного кода записи
 *  @returns {String}
 */
export function generateRandomCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndexLetter = Math.floor(Math.random() * letters.length);
  const randomCode =
    letters[randomIndexLetter] + Math.floor(Math.random() * 1000);

  return randomCode;
}

/**
 * Генерация уникального кода записи на основе кода последнего элемента в массиве
 * @param list {Array}
 * @returns {Number}
 */

export function generateCode(list) {
  const currentListLenght = list.length;
  return currentListLenght ? list[currentListLenght - 1].code + 1 : 1;
}

/**
 * Возвращение корректного окончания
 * @param number {Number} параметр от которого зависит окончание
 * @returns {String}
 */

export function getCorrectEnding(number) {
  if (number % 100 >= 11 && number % 100 <= 20) {
    return number + ' раз';
  } else {
    switch (number % 10) {
      case 1:
        return number + ' раз';
      case 2:
      case 3:
      case 4:
        return number + ' раза';
      default:
        return number + ' раз';
    }
  }
}
