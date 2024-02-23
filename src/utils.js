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

// Функция для возврата правильного окончания для слова "раз" по переданному числу
export function formatCounterWord(counter) {
  let rem = counter % 100;

  if (rem >= 5 && rem <= 20) {
    return "раз";
  }

  rem = counter % 10;

  console.log(rem);
  if (rem >= 2 && rem <= 4) {
    return "раза";
  } else {
    return "раз";
  }
}
