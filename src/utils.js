const propNames = new Set(['id', 'className', 'textContent', 'onclick'])

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name)

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name]
    } else {
      element.setAttribute(name, props[name])
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child)
  }

  return element
}

/**
 * Функция при каждом вызове возвращает уникальное значение/id
 * @param  без параметров
 * @returns  {string} уникальный id
 */
export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

/**
 * Функция возвращает текст "| Выделяли N раз" либо если не был выбран ни разу вернет пустую строку
 * @param {number | undefined} count принимает один параметр типа number либо undefined
 * @returns  {string} возвращает строку
 */
export function selectedNTimes(count) {
  if (count) return ` | Выделяли ${getString(count, 'раз')}`

  return ''
}

/**
 * Функция проверяет правильности строки в склонениях
 * @param {number} count принимает число
 * @param {string} str принимает строку
 * @returns {string} возвращает измененную строку
 */
function getString(count, str) {
  if (count % 10 >= 2 && count % 10 <= 4 && !(count >= 12 && count <= 14))
    return `${count} ${str}а`

  return `${count} ${str}`
}
