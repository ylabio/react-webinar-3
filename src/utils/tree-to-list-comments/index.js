export default function treeToListComments(tree, level = 0, result = []) {
  if (!tree) {
    return [];
  }
  for (const item of tree) {
    result.push({
      _id: item._id,
      text : item.text,
      dateCreate: item.dateCreate,
      author: item.author.profile.name,
      depth: level,
    });
    if (item.children.length > 0 ) {
      treeToListComments(item.children, level + 1, result);
    }
  }
  return result;
}