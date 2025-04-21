export default function findLastChild(comments, targetId) {
  for (const comment of comments) {
    if (comment._id === targetId) {
      if (comment.children && comment.children.length > 0) {
        return findLastChild(comment.children, comment.children[comment.children.length - 1]._id);
      }
      return comment;
    }
    if (comment.children) {
      const found = findLastChild(comment.children, targetId);
      if (found) return found;
    }
  }
  return null;
}
