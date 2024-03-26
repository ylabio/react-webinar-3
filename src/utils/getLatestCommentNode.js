// функция ищет последний children комментария на который собираемся отвечать, чтобы отобразить форму

export function getLatestCommentNode(comment) {
  if(comment.children.length === 0) {
    return comment._id;
  } else {
    return getLatestCommentNode(comment.children[comment.children.length - 1])
  }
}