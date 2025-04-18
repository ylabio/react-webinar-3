export function textsTreeToList(tree, callback, count = 0, result = []) {
  for (const item of tree) {
    if (!item?._id && item.children) {
      textsTreeToList(item.children, callback, count, result);
      break;
    }
    if (item?._id) {
      result.push(callback ? callback(item, count) : item);
    }
    if (item.children?.length){
        textsTreeToList(item.children, callback, count + 1, result);
  }}

  return result;
}
