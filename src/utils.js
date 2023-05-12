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
 * Выбор правильного склонения существительного
 * @param count {Number} Количество
 * @param wordVariants {Array} Массив словоформ
 * @returns {String}
 */

export function getWordVariant(count, wordVariants) {
  if (count % 100 > 10 && count % 100 < 20) {
    return wordVariants[0];
  }
  if (count % 10 > 1 && count % 10 < 5) {
    return wordVariants[1];
  }

  return wordVariants[0];
}
