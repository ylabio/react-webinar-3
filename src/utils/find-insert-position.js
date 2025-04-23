export default function findInsertPosition(targetId, lastChild, commentsList) {
  if (lastChild) {
    return {
      insertAfterId: lastChild.id,
      level: lastChild.level + 1,
    };
  }

  const parentComment = commentsList.find(comment => comment.id === targetId);

  return {
    insertAfterId: targetId,
    level: parentComment ? parentComment.level + 1 : 0,
  };
}
