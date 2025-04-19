import parentToNull from './parent-to-null';
import treeToList from './tree-to-list';
import listToTree from './list-to-tree';

export default function commentsFormat(articleId, items) {
  return treeToList(listToTree(parentToNull(articleId, items)), (item, level) => ({ ...item, level }));
}