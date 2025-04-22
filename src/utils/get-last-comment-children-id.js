export function getLastCommentChildrenId(id, itemsList) {
  const item = itemsList.find(item => item._id === id);
  
  if (!item) {
    return { lastItemId: id, lastChildFromTree: id };
  }

  let lastItem = item;

  while (lastItem.children && lastItem.children.length > 0) {
    lastItem = lastItem.children[lastItem.children.length - 1];
  }

  return { lastItemId: item._id, lastChildFromTree: lastItem._id };
}