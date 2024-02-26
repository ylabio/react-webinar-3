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

export function setTotalSelectedItems(a) {
  let total = a ? a : 0;

  function increment() {
    return total++;
  }

  increment();
  return total;
}

export function printWord(number) {
  let lastNumber = number % 10;
  let preLastNumberString = String(number);
  let preLastNumber = Number(
    preLastNumberString[preLastNumberString.length - 2]
  );

  if (lastNumber > 1 && lastNumber < 5 && preLastNumber !== 1) {
    return `${number} раза`;
  }
  return `${number} раз`;
}
