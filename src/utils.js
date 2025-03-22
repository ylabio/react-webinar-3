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
 * Подготовка данных. 
 * Присвоение уникальных code.
 * Установка поля selected. (отвечает за выбор записи)
 * Установка поля count. (показывает, сколько раз запись была выбрана)
 * @param list [Array] список записей
 */
export function prepareData (list) {
  let id = 1;
  const readyData = list.map((item) => {
    const newItem = {};
    newItem.code = id;
    newItem.title = item;
    newItem.selected = false;
    newItem.count = 0;
    id +=1
    return newItem;
  })

  return readyData;
}