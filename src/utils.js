/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


const elDisplayed = 3
/**
 * Пагинация
 * @param currIndex {Number}
 * @param lastIndex {Number}
 * @returns {Array}
 */
export function formPaginationArray(currIndex,lastIndex){
    const newPagArr = []
    newPagArr.push(1)
    newPagArr.push("...")
    let startIndex = currIndex - Math.floor(elDisplayed/2)
    if(startIndex < 1) startIndex=1
    if(startIndex + elDisplayed > lastIndex ) startIndex = lastIndex - elDisplayed + 1

    for(let i = startIndex ; i < startIndex + elDisplayed;i++){ 
        newPagArr.push(i)
    }
    newPagArr.push("...")
    newPagArr.push(lastIndex)
    if(startIndex <= 2){
        newPagArr.splice(startIndex -1, 3 - startIndex );
    }
    if(startIndex >= lastIndex - elDisplayed){
        newPagArr.splice(newPagArr.length - 2,  elDisplayed + 1 -(lastIndex -startIndex));
    }
    return(newPagArr)
}