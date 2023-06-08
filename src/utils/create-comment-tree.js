export default (list) => {
  const cache = new Map();
  const rootIds = [];

  for (const item of list) {
    if (item.parent._type === "article") {
      rootIds.push(item._id);
    } else {
      const parentItem = cache.get(item.parent._id);
      if (parentItem) {
        cache.set(item.parent._id, {
          ...parentItem,
          children: [...parentItem.children, item._id],
        });
      } else {
        cache.set(item.parent._id, { ...parentItem, children: [item._id] });
      }
    }
    cache.set(item._id, { ...item, children: [] });
  }

  const createTree = (itemId) => {
    const item = cache.get(itemId);
    return { ...item, children: item.children.map((el) => createTree(el)) };
  };

  return rootIds.map((el) => createTree(el));
};
