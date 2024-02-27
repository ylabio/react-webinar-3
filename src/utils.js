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

// Функция определения рандомного уникального кода
export function randomNum(list) {
  const num = Math.floor(Math.random() * 20 + 1);
  if (list.some((item) => item.code === num)) {
    return randomNum(list);
  } else return num;
}

// Функция определения слова после countdSelected
export function setWordAfterСounter(count, prefix, one, two, many) {
  const snumber = count.toString();
  const digit = parseInt(snumber[snumber.length - 1], 10);
  if (isNaN(digit)) {
    return "";
  }

  if (snumber.length > 1 && snumber[snumber.length - 2] == "1") {
    return " " + prefix + many;
  }
  if (digit == 1) {
    return " " + prefix + one;
  } else if (digit > 1 && digit <= 4) {
    return " " + prefix + two;
  } else if (digit == 0 || digit >= 5) {
    return " " + prefix + many;
  } else {
    return "";
  }
}
