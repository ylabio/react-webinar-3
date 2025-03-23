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
 * Сборка текста о количестве выделения задач
 */
export function getCountText(item) {
  if (item.selected) {
    item.selectedCountText = ' | Выделяли ';
    item.selectedCount ? (item.selectedCount += 1) : (item.selectedCount = 1);
    switch (item.selectedCount % 10) {
      case 2:
      case 3:
      case 4:
        if (
          item.selectedCount % 100 !== 12 &&
          item.selectedCount % 100 !== 13 &&
          item.selectedCount % 100 !== 14
        ) {
          item.selectedCountText += item.selectedCount + ' раза';
          break;
        }
      default:
        item.selectedCountText += item.selectedCount + ' раз';
    }
  }
}
