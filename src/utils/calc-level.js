export default function calcLevels(categories) {
  const byId = Object.fromEntries(categories.map(cat => [cat._id, { ...cat, children: [] }]));
  const roots = [];

  for (const cat of categories) {
    if (cat.parent && byId[cat.parent._id]) {
      byId[cat.parent._id].children.push(byId[cat._id]);
    } else {
      roots.push(byId[cat._id]);
    }
  }

  const result = [];
  const stack = roots.map(root => ({ node: root, level: 0 }));

  while (stack.length) {
    const { node, level } = stack.shift();
    result.push({ ...node, level });
    stack.unshift(...node.children.map(child => ({ node: child, level: level + 1 })));
  }

  return result;
}
