export default function getNestedComments(comments) {
  const commentMap = new Map();
  const nestedComments = [];

  // Первый проход - создаем карту комментариев с предварительными данными
  comments.forEach((comment) => {
    commentMap.set(comment._id, { ...comment, children: [] });
  });

  // Второй проход - строим структуру вложенности
  commentMap.forEach((comment) => {
    // Если у комментария есть родитель и этот родитель есть в карте
    if (comment.parent?._id && commentMap.has(comment.parent._id)) {
      commentMap.get(comment.parent._id).children.push(comment);
    } else {
      // Комментарий верхнего уровня или его родитель отсутствует в карте
      nestedComments.push(comment);
    }
  });

  return nestedComments;
}
