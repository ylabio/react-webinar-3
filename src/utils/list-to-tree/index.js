export default function listToTree(list, options = {}) {
  const { key = '_id', rootKey = 'parent', parentKey = 'parent._id', levelKey = 'level' } = options;

  const map = {};
  const roots = [];

  for (const item of list) {
    map[item[key]] = { ...item, children: [] };
  }

  for (const item of list) {
    const isRoot = typeof rootKey === 'function' ? rootKey(item) : !item[rootKey];

    if (isRoot) {
      map[item[key]][levelKey] = 0;
      roots.push(map[item[key]]);
    } else {
      const parentId = item[parentKey.split('.')[0]]?.[parentKey.split('.')[1]];
      if (parentId && map[parentId]) {
        map[item[key]][levelKey] = map[parentId][levelKey] + 1;
        map[parentId].children.push(map[item[key]]);
      }
    }
  }

  return roots;
}
