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

export function pluralise(n) {
  const list = [2, 3, 4];
  let times;
  let k = n % 100;
  if (k >= 10 && k <= 20) {
    times = "раз";
  } else {
    times = list.includes(n % 10) ? "раза" : "раз";
  }
  return ` | Выделяли ${n} ${times}`;
}

export function* codeGenerator(start) {
  while (true) yield start++;
}
