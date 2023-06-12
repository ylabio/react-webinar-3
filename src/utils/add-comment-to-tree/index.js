export function addCommentToTree(comment, commentsArray) {
  let newCommentsArray = [...commentsArray];

  if (comment.parent._type === 'article') {
    // Новый комментарий к статье
    newCommentsArray.push({ ...comment, children: [] });
  } else {
    // Ответ на комментарий
    const parentId = comment.parent._id;
    const updatedCommentsArray = addCommentToComment(comment, parentId, newCommentsArray);
    if (updatedCommentsArray) {
      newCommentsArray = updatedCommentsArray;
    }
  }

  return newCommentsArray;
}

function addCommentToComment(comment, parentId, commentsArray) {
  const newCommentsArray = [...commentsArray];

  for (let i = 0; i < newCommentsArray.length; i++) {
    const currentComment = newCommentsArray[i];

    if (currentComment._id === parentId) {
      if (!currentComment.children) {
        currentComment.children = [];
      }
      currentComment.children.push({ ...comment, children: [] });
      return newCommentsArray;
    } else if (currentComment.children && currentComment.children.length > 0) {
      const updatedChildren = addCommentToComment(comment, parentId, currentComment.children);
      if (updatedChildren) {
        currentComment.children = updatedChildren;
        return newCommentsArray;
      }
    }
  }

  return null;
}
