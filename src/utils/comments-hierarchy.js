export const sortCommentsByHierarchy = (comments) => {
  // Создаем объект для хранения комментариев по их id
  const commentsMap = new Map();

  // Заполняем Map комментариями
  comments.forEach(comment => {
    commentsMap.set(comment._id, comment);
  });

  // Функция для построения иерархии комментариев
  const buildCommentHierarchy = (comment) => {
    const parent = comment.parent;
    if (parent && parent._id && commentsMap.has(parent._id)) {
      const parentComment = commentsMap.get(parent._id);
      if (!parentComment.children) {
        parentComment.children = [];
      }
      parentComment.children.push(comment);
    }
  };

  // Строим иерархию комментариев
  comments.forEach(buildCommentHierarchy);

  // Фильтруем комментарии, оставляя только корневые (без родительских)
  const rootComments = comments.filter(comment => !comment.parent || comment.parent._type === 'article');

  return rootComments;
};