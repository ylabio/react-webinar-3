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

/**
 * Получение корректной строки в зависимости от количества выделений
 * @param selectCount {Number}
 * @return {String}
 */
export function getCorrectCountText(selectCount) {
  const lastDigit = selectCount.toString().slice(-1);
  const lastTwoDigits = selectCount.toString().slice(-2);

  return ` | Выделяли ${selectCount} раз${
    (lastDigit === "2" || lastDigit === "3" || lastDigit === "4") &&
    lastTwoDigits !== "12" &&
    lastTwoDigits !== "13" &&
    lastTwoDigits !== "14"
      ? "a"
      : ""
  }`;
}
