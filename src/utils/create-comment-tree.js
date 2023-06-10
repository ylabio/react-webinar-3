
const DEEP_LIMIT = 5;

const format = (el) => ({
  authorName: el.author.profile.name,
	authorId: el.author.profile._id,
  date: el.dateCreate,
  text: el.text,
	id: el._id
});

export default (list, itemFormat = format) => {
  const cache = new Map();
  const rootIds = [];
  for (const item of list) {
    if (item.parent._type === "article") {
      rootIds.push(item._id);
    } else {
			const lastDeepParent = item.parent._tree[item.parent._tree.length - DEEP_LIMIT]?._id
			const parentId = lastDeepParent || item.parent._id;
      const parentItem = cache.get(parentId);
      if (parentItem) {
				Object.assign(parentItem, {children: [...parentItem.children, item._id]})
      } else {
        cache.set(parentId, { children: [item._id] });
      }
    }
    cache.set(item._id, { ...item, children: [] });
  }
  // for (const item of list) {
  //   if (item.parent._type === "article") {
  //     rootIds.push(item._id);
  //   } else {
  //     const parentItem = cache.get(item.parent._id);
  //     if (parentItem) {
  //       cache.set(item.parent._id, {
  //         ...parentItem,
  //         children: [...parentItem.children, item._id],
  //       });
  //     } else {
  //       cache.set(item.parent._id, { ...parentItem, children: [item._id] });
  //     }
  //   }
  //   cache.set(item._id, { ...item, children: [] });
  // }

  const createTree = (itemId) => {
    const item = cache.get(itemId);
    return {
      ...itemFormat(item),
      children: item.children.map((el) => createTree(el)),
    };
  };

  return rootIds.map((el) => createTree(el));
};
