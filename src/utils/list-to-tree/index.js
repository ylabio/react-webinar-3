/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, key = '_id') {
  const map = new Map();
  const roots = [];

  for (const item of list) {
    map.set(item._id, { ...item, children: [] });
  }

  for (const item of list) {
    const parentId = item.parent?.[key];
    if (parentId && map.has(parentId)) {
      map.get(parentId).children.push(map.get(item[key]));
    } else {
      roots.push(map.get(item[key]));
    }
  }

  return roots;
}
