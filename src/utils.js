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

function deepPerent(data,search,count){
  let result = data.find((el)=>el._id==search)
  if(!result.parent){
    return count
  }
  if(result.parent){
    return deepPerent(data,result.parent._id,count+1)
  }
}

function createTreeData(arr, idProp, parentProp) {
  const tree = Object.fromEntries(arr.map(n => [ n[idProp], { ...n, children: [] } ]));
  return Object.values(tree).filter(n => !tree[n[parentProp]]?.children.push(n));
}

function makeData(data){
  let output =[]
  for(let i =0; i<data.length;i++){
    output.push(data[i])
    if(data[i].children){
      output.push(...makeData(data[i].children))
    }
  }
  return [...output]
}

export function addNesting(data){
  let result =[...data]
  result.map((el)=>{
    if(el.parent){
      let count = deepPerent(data,el.parent._id,1)
      el.title ='-'.repeat(count)+el.title
      el.parent_id=el.parent._id
      return el
    }
    return el
  })

  const output = createTreeData(result, '_id', 'parent_id');
  return makeData(output)
}