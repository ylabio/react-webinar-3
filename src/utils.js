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
 * Определяем склонение слова, исходя из числа и возвращаем вместе с числом
 * @param {*} number // Число
 * @param {*} one // Вариант слова с окончанием для 1 экземпляра
 * @param {*} two // Вариант слова с окончанием для 2 экземпляров
 * @param {*} five // Вариант слова с окончанием для 5 экземпляров
 * @returns 
 */
export function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return `${number} ${five}`;
  }
  n %= 10;
  if (n === 1) {
    return `${number} ${one}`;
  }
  if (n >= 2 && n <= 4) {
    return `${number} ${two}`;
  }
  return `${number} ${five}`;
}
