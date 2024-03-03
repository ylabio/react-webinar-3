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


  // Проанализирует коды в списке записей и вернёт код с самым большим значением 
  export function getGreaterRecordCode(list) {
    let initalCode = 0;

    list.map((item) => {
      if (item.code > initalCode) {
        initalCode = item.code;
      }
    })

    return initalCode;
  }
  
  // Генерирует новый уникальный код путём инкремента прошлого кода на 1
  export function generateNewUniqueCode(previousCode) {
    return previousCode += 1;
  }
