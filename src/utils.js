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

/**
 * Функция создания счётчика
 * @returns {function(): number}
 */

export function createCounter() {
  let counter = 0;
  return () => counter++;
}

export const generateUniqueId = createCounter();

/**
 * Функция определяющая правильное склонение слова в зависимости от переданного числа
 * @param num Число
 * @param singular Слово в единственном числе
 * @param decl1 Форма склонения для чисел заканчивающихся на 2, 3, 4 (кроме чисел заканчивающихся на 12, 13, 14)
 * @param decl2 Форма склонения для остальных случаев
 */
export function getDeclination(num, singular, decl1, decl2) {
  const remainderOf10 = num % 10;
  const remainderOf100 = num % 100;

  const isDecl1 = remainderOf10 >= 2 && remainderOf10 <= 4 && (remainderOf100 < 12 || remainderOf100 > 14);

  if (remainderOf10 === 1 && remainderOf100 !== 11) {
    return `${num} ${singular}`;
  } else if (isDecl1) {
    return `${num} ${decl1}`;
  } else {
    return `${num} ${decl2}`;
  }
}
