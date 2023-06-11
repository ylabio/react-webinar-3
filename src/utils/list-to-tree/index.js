/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @param [rootElementId] {String} Свойство id рутового элемента
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, rootElementId = '', key = '_id') {
  let trees = {};
  let roots = {};
  for (const item of list) {

    // Добавление элемента в индекс узлов и создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      // Ещё никто не ссылался, поэтому пока считаем корнем
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }
    // Если элемент имеет родителя, то добавляем его в подчиненные родителя и элемент не рутовый(главный)
    if (item.parent?._id && item.parent?._id !== rootElementId) {
      // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
      if (!trees[item.parent._id]) trees[item.parent[key]] = {children: []};
      // Добавления в подчиненные родителя
      trees[item.parent[key]].children.push(trees[item[key]]);
      // Так как элемент добавлен к родителю, то он уже не является корневым
      if (roots[item[key]]) delete roots[item[key]];
    }
  }
  return Object.values(roots);
}
