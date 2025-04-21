/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param options {Object} Настройки ключей
 * @param options.key {String} Ключ идентификатора (по умолчанию '_id')
 * @param options.rootKey {String|Function} Условие корневого узла (по умолчанию 'parent')
 * @param options.parentKey {String} Ключ для получения ID родителя (по умолчанию 'parent._id')
 * @param options.levelKey {String} Ключ для хранения уровня вложенности (по умолчанию 'level')
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, options = {}) {
  const {
    key = '_id',
    rootKey = 'parent',
    parentKey = 'parent._id',
    levelKey = 'level',
  } = options;

  const map = {};
  const roots = [];

  // Создание мапы всех узлов с children
  for (const item of list) {
    map[item[key]] = { ...item, children: [] };
  }

  // Сборка дерева
  for (const item of list) {
    const node = map[item[key]];
    const isRoot = typeof rootKey === 'function' ? rootKey(item) : !item[rootKey];

    if (isRoot) {
      node[levelKey] = 0;
      roots.push(node);
    } else {
      const [parentField, idField] = parentKey.split('.');
      const parentId = item[parentField]?.[idField];

      if (parentId && map[parentId]) {
        node[levelKey] = (map[parentId][levelKey] || 0) + 1;
        map[parentId].children.push(node);
      }
    }
  }

  return roots;
}
