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

export const getTranformedArray = (initialArray) => {
  const result = []
  const arr = [...initialArray];

  arr.forEach((category) => {
   
    // для всех категорий у которых нет родительской категории
    if(!category.parent) {
      // находим детей
      const children = arr.filter((el) => el?.parent?._id === category.value )
      // сначала пушим сами категории
      result.push({title: category.title, value: category.value})

      // преобразовываем и пушим детей
      if(children) {
        children.forEach((child) => {
          result.push({
            value: child.value,
            title: `- ${child.title}`
          })

          // находим детей второго уровня
          const secondChildren = arr.filter((secondChild) => child.value === secondChild.parent?._id)

          if(secondChildren) {
            secondChildren.forEach((child) => {
              // преобразовываем и пушим детей
              result.push({
                value: child.value,
                title: `- -  ${child.title}`
              })

              // находим детей третьего уровня
              const thirdChildren = arr.filter((thirdChild) => child.value === thirdChild.parent?._id)
              if (thirdChildren) {
                thirdChildren.forEach((child) => {
                  result.push({
                    value: child.value, 
                    title: `- - - ${child.title}`
                  })
                })
              }
            })
          }
        })
      }
    }
  })

  return result;
}