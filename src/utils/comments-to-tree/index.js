export function commentsToTree(comments) {
  let commentMap = {};
  let roots = [];

  // Создаем хэш-таблицу для быстрого доступа к комментариям по их _id
  for (const comment of comments) {
    comment.children = [];
    commentMap[comment._id] = comment;
  }

  // Строим древовидную структуру, находя каждому комментарию его родителя
  for (const comment of comments) {
    const parentId = comment.parent?._id;
    const parentType = comment.parent?._type;

    if (parentId && parentType === 'comment') {
      const parentComment = commentMap[parentId];
      if (parentComment) {
        parentComment.children.push(comment);
      } else {
        // Если родительский комментарий не найден, добавляем текущий комментарий в корни
        roots.push(comment);
      }
    } else {
      // Если у комментария нет родителя или родитель не является комментарием, добавляем его в корни
      roots.push(comment);
    }
  }

  return roots;
}
