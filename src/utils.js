/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
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

function categoriesSort(arr){
  const tempArr = [...arr]

  for (let i = 0; i < tempArr.length; i++){
    if(tempArr[i].parent?._id){
      for (let j= 0; j < tempArr.length; j++){
        if(tempArr[i].parent._id === tempArr[j]?._id){
          if(tempArr[j].children)  {
            tempArr[j].children.push(tempArr[i]);
          } else {
            tempArr[j].children = [tempArr[i]];
          }
        } else {
          if (tempArr[j]?.children) {
            categoriesSort(tempArr[j].children);
          };
        };
      }
    }
  }
  return tempArr
}




export function categoriesToDisplay(arr){
  if(!arr?.length) return [];

  const categoriesSortedArr = categoriesSort(arr).filter(item => !item.parent?._id)

  let view = [{title: 'Все', value: ''}];

  function categoryView(arr, cnt = 0){
    for (let i = 0; i < arr.length; i++){
      view.push({title: '-'.repeat(cnt) + arr[i].title, value: arr[i]._id})
      if(arr[i]?.children){
        const newCnt = cnt + 1
        categoryView(arr[i].children, newCnt);
      };
    }
  }
  categoryView(categoriesSortedArr);
  
  return view
} 

function setToLocalStorage(key){
  window.localStorage.getItem(key)
}

function getFromLocalStorage(){
  window.localStorage.setItem(key)
}