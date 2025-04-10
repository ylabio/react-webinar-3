export default function calcLevels(categories) {
  const map = new Map();
  const roots = [];

  categories.forEach(cat => {
    map.set(cat._id, { ...cat, children: [] });
  });

  for (const cat of categories) {
    if (cat.parent && map.has(cat.parent._id)) {
      map.get(cat.parent._id).children.push(map.get(cat._id));
    } else {
      roots.push(map.get(cat._id));
    }
  }

  const result = [];

  function traverse(node, level) {
    result.push({ ...node, level });
    for (const child of node.children) {
      traverse(child, level + 1);
    }
  }

  for (const root of roots) {
    traverse(root, 0);
  }

  return result;
}
