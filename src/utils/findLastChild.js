export default function findLastChild(comments, targetId, parentLevel = 0) {
  for (const comment of comments) {
    if (comment._id === targetId) {
      if (comment.children && comment.children.length > 0) {
        const lastChild = findLastChild(
          comment.children,
          comment.children[comment.children.length - 1]._id,
          parentLevel + 1,
        );
        return {
          ...lastChild,
          level: parentLevel + 1,
        };
      }
      return {
        ...comment,
        level: parentLevel + 1,
      };
    }
    if (comment.children) {
      const found = findLastChild(comment.children, targetId, parentLevel + 1);
      if (found) return found;
    }
  }
  return null;
}
