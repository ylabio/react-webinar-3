const propNames = new Set(['id', 'className', 'textContent', 'onclick']);
const codesSet = new Set(); // Создаем пустое множество для уникальности кодов

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

export function generateUniqueNumber(list) {

  //Функция для генерации уникальных чисел в рамках сессии
  list.map(item => codesSet.add(item.code)) // Добавляем все значения кодов из исходного листа
  const randomNumber = Math.floor(Math.random() * (codesSet.size + 1)); // Генерируем случайное число

  if (codesSet.has(randomNumber)) {
    return generateUniqueNumber(list); // если сгенерированный код содержится в сете, то генерируем новый код
  } else {
    codesSet.add(randomNumber);
    return randomNumber; // если такого кода нет, то возвращаем это число
  }
}

export function getPlural(number) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return 'раз';
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return 'раза';
  } else {
    return 'раз';
  }
}
