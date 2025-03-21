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
 * Создание листенера клавиш для State
 * @returns {() => boolean}
 */
export function keyListeners() {
  let isPressed = false;

  document.addEventListener('keydown', (event) => {
    if (event.key == 'Control' || event.metaKey) {
      isPressed = true;
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key == 'Control' || event.metaKey) {
      isPressed = false;
    }
  });

  return () => isPressed;
}

/**
 * Создание и возврат сообщения о количестве кликов
 * @param msg {String} Текст
 * @param cnt {Integer} Число кликов
 * @param wrd {String} Словоформа для склонения без окончания или мягкого знака
 * @param ends {Array} Массив с окончаниями для соответствующих цифр ['1', '2-4', 'все остальные']
 * @returns {String}
 */
export function countMessage(msg, cnt, wrd, ...ends) {

  let pluralize = determineLanguage();
  function determineLanguage() {
    if (/[а-я]/.test(wrd)) return russianPlural;
    else return englishPlural;
  }
  function englishPlural() {
    if (cnt != 1) return 's';
    return '';
  }
  function russianPlural() {
    if (cnt % 10 == 1) return ends[0];
      else if ([2,3,4].includes(cnt % 10) && ![12,13,14].includes(cnt % 100)) return ends[1]; 
      return ends[2];
  }

  let finalWord = wrd + pluralize();
  return ' | ' + msg + ' ' + cnt + ' ' + finalWord;
}
