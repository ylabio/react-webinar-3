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

// Функция плюрализации раз, раза
export function fPluralization(num)
{
  var vPlur = false;
  var v10 = 0;
  var v100 = 0;
  v10 = num % 10; // остаток от деления на 10
  v100 = (num % 100) / 10; // формула для десятков
  if (v10 >= 2 && v10 <= 4 && // если не 2,3,4 единицы и
      (v100 < 1 || v100 > 2) ) {// если десяток не 1, то истина
        vPlur = true;
  }
  return vPlur;
}