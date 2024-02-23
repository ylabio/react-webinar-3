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

// Функция счетчик для получения номера в листе элементов
export const getElementCode = (() => {
  let code = 1;
  return () => {
      return code++;
  };
})();

// Функция, возвращающая склонение 'раз / раза'
export const getNumWord = (value) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  
  if (value > 10 && value < 20) {
    return 'раз';
  }
  if (num > 1 && num < 5) {
    return 'раза';
  }
  if (num === 1) {
    return 'раз';
  }
  return 'раз'; 
};
