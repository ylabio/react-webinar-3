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

const createCodeGenerator = (start = 0) => {
  return () => {
    return ++start;
  };
};

export const globalCodeGenerator = createCodeGenerator();

export const showSelectionTimes = (timesSelected) => {
  if (timesSelected) {
    return `Выделяли ${timesSelected} ${
      [1, 5, 6, 7, 8, 9, 0].includes(timesSelected % 10) ||
      [12, 13, 14].includes(timesSelected % 100)
        ? 'раз'
        : 'раза'
    }`;
  }
  return '';
};
