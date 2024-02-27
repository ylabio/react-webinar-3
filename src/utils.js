const propNames = new Set(["id", "className", "textContent", "onclick"]);

/**
 * Выбор формы слова в зависимости от числа.
 *
 * @param {Array<String>} forms - Массив форм слова для различных чисел
 * @param {Number} n - Число, от которого зависит форма слова
 * @returns {String} - Возвращает правильную форму слова
 */
export function plural(forms, n) {
  let idx;
 
  if (n % 10 === 1 && n % 100 !== 11) {
      idx = 0; 
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      idx = 1; 
  } else {
      idx = 2; 
  }
  return forms[idx] || '';
}
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
