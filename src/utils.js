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

export function generateNumber(list) {
  let codeArray = []
  list.forEach(item => codeArray.push(item.code))
  for (let i = 0; i <= codeArray.length + 1; i++) {
    if (!codeArray.includes(i)) {
      return i
    }
  }
}

export function declineNumber(number, words) {
  /**
   *   Массив заполняется словами, отвечая на вопросы:
   *   Сколько для 1?
   *   Сколько для 2?
   *   Сколько для 5?
   */
  number = Math.abs(number) % 100
  let value = number % 10
  if (number > 10 && number < 20) {
    return words[2]
  }
  if (value > 1 && value < 5) {
    return words[1]
  }
  if (value === 1) {
    return words[0]
  }
  return words[2]
}
