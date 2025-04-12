export default function CategoryTree(categories) {
  const buildTree = (items, parent = null, depth = 0) => {
    return items
      .filter(item => (item.parent?._id || null) === parent)
      .map(item => ({
        ...item,
        depth,
        children: buildTree(items, item._id, depth + 1),
      }));
  };

  const flatList = [];
  const flat = items => {
    items.forEach(item => {
      flatList.push({
        value: item._id,
        title: `${' - '.repeat(item.depth)}${item.title}`,
        justTitle: item.title, //без дефисов
      });
      if (item.children?.length) flat(item.children);
    });
  };

  const tree = buildTree(categories);
  flat(tree);

  return flatList;
}
