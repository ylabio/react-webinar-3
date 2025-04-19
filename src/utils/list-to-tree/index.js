/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @param [rootType] {String} Тип корневого узла (например, 'article')
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, key = '_id', rootType = 'article') {
  const map = {};
  const roots = [];

  // Индексируем элементы по ключу
  for (const item of list) {
    if (!item[key]) continue; // защита от пустых ключей
    map[item[key]] = { ...item, children: [] };
  }

  // Формируем дерево
  for (const item of list) {
    const id = item[key];
    const parentId = item.parent?.[key];
    const parentType = item.parent?._type;

    if (parentId && map[parentId]) {
      map[parentId].children.push(map[id]);
    } else if (parentType === rootType || !item.parent) {
      roots.push(map[id]);
    }
  }

  return roots;
}
