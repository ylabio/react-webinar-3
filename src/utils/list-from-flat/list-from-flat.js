import listToTree from '../list-to-tree';
import treeToList from '../tree-to-list';

/**
 * Преобразует список комментариев в плоский список с уровнями вложенности.
 * @param list - список комментариев
 * @param key - ключ идентификатора (по умолчанию "_id")
 */
export function listFromFlat(list, key = '_id') {

  console.log("listFromFlatlist", list);

  const tree = listToTree(list, key);
  console.log("listFromFlattree", tree);
  return treeToList(tree[0]?.children || [], (item, level) => ({
    value: item[key],
    level,
    text: item.text,
    author: item.author?.profile?.name,
    authorId: item.author?._id,
    dateCreate: item.dateCreate,
    parent: item.parent,
  }));
}
