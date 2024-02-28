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
 * Функция для выбора правильной формы слова в зависимости от числа
 * @param {number} count - кол-во элементов
 * @param {string[]} words - массив форм слова для 1, 2 и 5
 * @returns {string} - подходящая форма слова
 */
export function pluralize(count, words) {
	const cases = [2, 0, 1, 1, 1, 2];
	return words[
		count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
	];
}
