export default function findInsertPosition(targetId, lastChild, commentsList) {
  // Если есть последний дочерний комментарий, вставляем после него
  if (lastChild) {
    return {
      insertAfterId: lastChild._id,
      level: lastChild.level,
    };
  }

  // Находим родительский комментарий в списке
  const parentComment = commentsList.find(comment => comment.id === targetId);

  // Определяем уровень вложенности для нового комментария
  const nestingLevel = parentComment
    ? parentComment.level + 1 // Уровень на 1 больше родительского
    : 1; // Корневой уровень, если родитель не найден

  return {
    insertAfterId: targetId, // Вставляем после целевого комментария
    level: nestingLevel, // Уровень вложенности нового комментария
  };
}
