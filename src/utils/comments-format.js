import parentToNull from './parent-to-null';
import treeToList from './tree-to-list';
import listToTree from './list-to-tree';

export default function commentsFormat(articleId, items) {
  return listToTree(parentToNull(articleId, items));
}