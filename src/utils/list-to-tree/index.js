/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, key = '_id') {
  const map = {};
  const roots = [];

  // Индексируем комментарии по id
  for (const item of list) {
    if (!item[key]) continue; // защита от пустых _id
    map[item[key]] = { ...item, children: [] };
  }

  // Формируем дерево
  for (const item of list) {
    const id = item[key];
    const parentId = item.parent?.[key];

    if (parentId && map[parentId]) {
      map[parentId].children.push(map[id]);
    } else {
      roots.push(map[id]);
    }
  }

  return roots;
}
