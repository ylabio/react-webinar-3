const propNames = new Set(["id", "className", "textContent", "onclick"]);

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
 * Функция определяет какую форму слова "раз" использовать в зависимости от числа
 * @param number {Number} Counter
 * @returns {String}
 */
export function pluralize(number) {
  // Определяем последнюю цифру числа
  const lastDigit = number % 10;

  // Определяем последние две цифры числа
  const lastTwoDigits = number % 100;

  // Проверяем особые случаи для чисел 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return ` | Выделяли ${number} раз`;
  }

  // Определяем склонение в зависимости от последней цифры
  if (lastDigit === 1) {
    return ` | Выделяли ${number} раз`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return ` | Выделяли ${number} раза`;
  } else {
    return ` | Выделяли ${number} раз`;
  }
}
