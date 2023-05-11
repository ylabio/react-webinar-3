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
// функция вывода количества нажатий на задачу
export function getSelectedCounter(num) {
    const lastNumber = num?  +num.toString().slice(-1) : 0;
    const isEndingWith =
        (num >= 2 && num < 5) ||
        (num > 21 && lastNumber >= 2 && lastNumber < 5);

    const resultCounterWord = isEndingWith ? 'раза' : 'раз';
    let result = num !== 0 ? `| Выделяли ${num} ${resultCounterWord}` : null;
    return result;
}

export function showNumberCounter (item) {
    if(item.selectCounterNumber > 0) {
        return getSelectedCounter(item.selectCounterNumber)
    }
    else {
        item.selectCounterNumber = 0;
        return '';
    }
}