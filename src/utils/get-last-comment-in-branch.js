export default function getLastComment(comment, depth = 0) {
  if (!comment.children || comment.children.length === 0) {
    return { id: comment._id, depth };
  }
  let lastCommentInfo = null;
  for (const child of comment.children) {
    const childLastCommentInfo = getLastComment(child, depth + 1);
    if (childLastCommentInfo) {
      lastCommentInfo = childLastCommentInfo;
    }
  }
  return lastCommentInfo;
}
