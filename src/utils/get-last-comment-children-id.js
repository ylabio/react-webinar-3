export function getLastCommentChildrenId(id, itemsList) {
  const item = itemsList.find(item => item._id === id);
  let lastItem = {};
  const findLastIdTree = (itemId, list) => {
    lastItem = list.find(item => item._id === itemId);
    if (lastItem.children.length > 0) {
      findLastIdTree(lastItem.children[lastItem.children.length - 1]._id, list);
    }
  };

  if (item.children.length > 0)
    findLastIdTree(item.children[item.children.length - 1]._id, itemsList);
  else lastItem = { ...item };
  return { lastItemId: item._id, lastChild: lastItem._id };
}
