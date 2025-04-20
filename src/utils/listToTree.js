/**
 * Converts a flat list of items to a tree structure
 * @param {Array} list - Flat list of items with parentId references
 * @param {string|number} rootType - Type of root items (e.g., 'article' for comments)
 * @returns {Array} Tree structure of items
 */
export function listToTree(list, rootType) {
  if (!Array.isArray(list)) return [];

  const map = {};
  const roots = [];

  for (const item of list) {
    if (!item || !item._id) continue;
    map[item._id] = { ...item, children: [] };
  }

  for (const id in map) {
    const item = map[id];
    if (!item.parent || typeof item.parent !== 'object') continue;

    if (item.parent._type === rootType) {
      roots.push(item);
    } else if (item.parent._id && map[item.parent._id]) {
      map[item.parent._id].children.push(item);
    }
  }

  return roots;
}
