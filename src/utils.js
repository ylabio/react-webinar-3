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

// Для уникальности кода
export function getNewCode(list){
  let max = 0
  for(let item of list){
      if(item.code > max){
          max = item.code
      }
  }
  return max + 1
}

// Для правильного написания раз или раза
export function getRazOrRaza(num){
  if (num % 10 === 1 && num % 100 !== 11) {
    return num + ' раз';
  } else if ((num % 10 === 2 || num % 10 === 3 || num % 10 === 4) && 
            !(num % 100 >= 12 && num % 100 <= 14)) {
    return num + ' раза';
  } else {
    return num + ' раз';
  }
}