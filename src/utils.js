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

export function selectWordDeclension(N, wordForms) {
  N = Math.abs(N) % 100;
  const lastNumberOfN = N % 10;
  if (N > 10 && N < 20) {
    return wordForms[2];
  }
  if (lastNumberOfN > 1 && lastNumberOfN < 5) {
    return wordForms[1];
  }
  if (lastNumberOfN === 1) {
    return wordForms[0];
  }
  return wordForms[2];
}
