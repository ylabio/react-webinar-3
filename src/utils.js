
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

export function makeCategoryList(arr) {
    const mainArr = [...arr];
    console.log(mainArr);
    for(let i = 0; i < mainArr.length; i++) {
        if(mainArr[i].parent?._id) {
            for(let j = 0; j < mainArr.length; j++) {
                if(mainArr[i].parent._id === mainArr[j]?._id) {
                    if(mainArr[j].children) {
                        mainArr[j].children.push(mainArr[i]);
                    } else {
                        mainArr[j].children = [mainArr[i]];
                    }
                } else {
                    if(mainArr[j]?.children) {
                        makeCategoryList(mainArr[j].children);
                    }
                }
            }
        }
    }
    return mainArr;
}

export function displayCategories(arr) {
    if(!arr?.length) return [];

    const sortedArr = makeCategoryList(arr).filter(item => !item.parent?._id);
    let scheme = [{title: "Все", value: ""}];

    function categoryScheme(arr, count = 0) {
        for(let i = 0; i < arr.length; i++) {
            scheme.push({title: "-".repeat(count) + "  " + arr[i].title, value: arr[i]._id});
            if(arr[i]?.children) {
                let countNew = count + 1;
                categoryScheme(arr[i].children, countNew);
            }
        }
    }
    categoryScheme(sortedArr);
    return scheme;
} 

export function setLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
}

export function getLocalStorageItem(key) {
    return  localStorage.getItem(key);
}

export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}