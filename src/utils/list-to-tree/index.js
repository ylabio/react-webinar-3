
export default function listToTree(list, rootType, key = '_id') {
  const nodes = {};
  const roots = [];

  for (const item of list) {
    nodes[item[key]] = { ...item, children: [] };
  }

  for (const item of list) {
    const node = nodes[item[key]];
    
    if (item.parent?.[key]) {
      const parent = nodes[item.parent[key]];
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    } else if (!item.parent || item.parent._type === rootType) {
      roots.push(node);
    }
  }

  return roots;
}
