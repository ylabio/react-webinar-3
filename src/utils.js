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

// Генератор уникальных чисел элементов
export const codeId = (() => {
  let id = 1;
  return () => {
      return id ++;
  };
})();


// plurals для слова раз/раза
export function morph(numberOfSelects) {
  if (numberOfSelects % 10 === 1 && numberOfSelects % 100 !== 11) {
    return 'раз'
  } else if (numberOfSelects % 10 >= 2 && numberOfSelects % 10 <= 4 && (numberOfSelects % 100 < 10 || numberOfSelects % 100 >= 20)) {
    return 'раза'
  } else {
    return 'раз'
  }
}
console.log(morph(1055))
