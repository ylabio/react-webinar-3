/**
 * Преобразование иерархии в список.
 * @param tree {Array} Иерархия - список узлов со свойством children.
 * @param [callback] {Function} Для пользовательского преобразования элемента.
 * @param [level] {Number} Начальный уровень вложенности.
 * @param [maxLevel] {Number} Максимальный уровень вложенности.
 * @param [result] {Array} Результат функции (используется рекурсией).
 * @returns {Array} Корневые узлы
 */
export default function treeToList(tree, callback, level = 0, result = [], maxLevel) {
  for (const item of tree) {
    result.push(callback ? callback(item, level) : item);
    if (item.children?.length) {treeToList(item.children, callback, maxLevel && level>=maxLevel ? level : level + 1 , result); if (item.title == undefined) result.push(callback({status: 'empty', _id:item._id, text: "", dateCreate:"0000-01-01T00:00:00.000Z"},level+1))};
    if (!item.children?.length && item.title == undefined) result.push(callback({status: 'empty', _id:item._id, text: "", dateCreate:"0000-01-01T00:00:00.000Z"},level+1));
  }
  return result;
}
