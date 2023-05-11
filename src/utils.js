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

export function getTitle(item){
  if(item.clickCount === 0) return item.title

  const value = Math.abs(item.clickCount) % 100;
  const num = value % 10;

  if(value === 12 || value === 13 || value ===14){
    return`${item.title} | Выделяли ${item.clickCount} раз`;
  }

  if(num > 1 && num < 5) {
    return `${item.title} | Выделяли ${item.clickCount} раза`;
  }else {
    return`${item.title} | Выделяли ${item.clickCount} раз`;
  }
}