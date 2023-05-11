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

/** функция для нахождения максимального ID, чтобы не основываться на длине массива
 * @param arr {Array} Список элементов
 * @returns {number}
 */

export function findMaxId(arr = []) {
    if (arr.length == 0) return 0;

    return arr.map((item) => item.code).sort((a, b) => b - a)[0];
}

/**
 * @param num {number} Список элементов
 * @returns {string}
 */

export function wordDeclination(num) {
    const lastDigit = num % 10,
        lastTwoDigit = num % 100;

    if (lastTwoDigit > 11 && lastTwoDigit < 15) return "раз";
    if (lastDigit > 1 && lastDigit < 5) return "раза";

    return "раз";
}
