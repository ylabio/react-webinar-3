/**
 * Преобразование списка в иерархию.
 * @param tree {Array} Иерархия - список узлов со свойством children.
 * @param [callback] {Function} Для пользовательского преобразования элемента.
 * @param [level] {Number} Начальный уровень вложенности.
 * @param [result] {Array} Результат функции (используется рекурсией).
 * @returns {Array} Корневые узлы
 */
export default function treeToList(tree, callback, level = 0, result = []) {
  for (const item of tree) {
    // Добавление элементу свойства lastChild
    if (!item.children?.length) {
      item.lastChild = item._id;
    } else {
      const lastChildIndex = item.children.length - 1;
      const lastChild = item.children[lastChildIndex];
      item.lastChild = lastChild._id;
    }
    
    result.push(callback ? callback(item, level) : item);
    if (item.children?.length) treeToList(item.children, callback, level + 1, result);
  }
  return result;
}
