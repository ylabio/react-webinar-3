export default function findInsertPosition(targetId, lastChild, list) {
  if (lastChild) {
    return {
      insertAfterId: lastChild._id,
      level: lastChild.level,
    };
  }
  const parentComment = list.find(c => c.id === targetId);
  return {
    insertAfterId: targetId,
    level: parentComment ? parentComment.level + 1 : 1,
  };
}
