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

// Для красоты определяем, нужно ли окончание "а" в слове "раз"
export function isNeedLastLetter(counter) {
  const condition = counter % 100 > 11 && counter % 100 <= 14;
  const exceptions = [2, 3, 4];
  const arrOfletters = counter.toString().split("");
  const lastNum = +arrOfletters[arrOfletters.length - 1];
  return exceptions.includes(lastNum) && !condition ? true : false;
}
