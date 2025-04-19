export default function flattenCommentTree(tree, level = 0) {
  const result = [];

  for (const comment of tree) {
    result.push({ ...comment, level });

    if (comment.children?.length) {
      result.push(...flattenCommentTree(comment.children, level + 1));
    }
  }

  return result;
}
