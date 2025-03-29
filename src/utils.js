const propNames = new Set( [ 'id', 'className', 'textContent', 'onclick' ] );

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement( name, props = {}, ...children ) {
  const element = document.createElement( name );

  // Назначение свойств и атрибутов
  for ( const name of Object.keys( props ) ) {
    if ( propNames.has( name ) ) {
      element[name] = props[name];
    } else {
      element.setAttribute( name, props[name] );
    }
  }

  // Вставка вложенных элементов
  for ( const child of children ) {
    element.append( child );
  }

  return element;
}


export function isEven(index) {
  return index % 2 === 0
}

export function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function sumReducer(sum, item){
  return sum + item;
}

export const getDeclension = (count) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'ов';
  if (lastDigit === 1) return '';
  if (lastDigit >= 2 && lastDigit <= 4) return 'а';
  return 'ов';
};

export function generateUniqueKey(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}:<>?';
  const uniqueChars = [...new Set(chars)];

  if (length > uniqueChars.length) {
    throw new Error(`Длина ключа (${length}) превышает количество уникальных символов (${uniqueChars.length})`);
  }

  const shuffled = [...uniqueChars];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, length).join('');
}
