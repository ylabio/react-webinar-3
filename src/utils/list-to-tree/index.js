/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
export default function listToTree(
  list,
  key = '_id',
  options = {},
) {
  const {
    parentKey = 'parent',
    rootType = null,
    rootId = null
  } = options;

  let trees = {};
  let roots = {};

  for (const item of list) {
    const itemId = item[key];
    const parent = item?.[parentKey];
    const parentId = parent?.[key];
    const parentType = parent?._type;

    // Создание элемента и children
    if (!trees[itemId]) {
      trees[itemId] = { ...item, children: [] };
      roots[itemId] = trees[itemId];
    } else {
      trees[itemId] = Object.assign(trees[itemId], item);
    }

    // Если есть родитель
    if (parentId) {
      if (!trees[parentId]) {
        trees[parentId] = { children: [] };
        roots[parentId] = trees[parentId];
      }
      trees[parentId].children.push(trees[itemId]);

      if (roots[itemId]) delete roots[itemId];
    }

    // Только если rootType задан — проверяем его
    if (
      rootType !== null &&
      (parentType !== rootType || parentId !== rootId)
    ) {
      if (roots[itemId]) delete roots[itemId];
    }
  }

  return Object.values(roots);
}
