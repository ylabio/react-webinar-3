export default function buildCommentTree(comments) {
    const commentMap = new Map();
    const nestedComments = [];
  
    comments.forEach(comment => {
      commentMap.set(comment._id, { ...comment, children: [] });
    });
  
    commentMap.forEach(comment => {
      if (comment.parent && comment.parent._id && commentMap.has(comment.parent._id)) {
        const parentComment = commentMap.get(comment.parent._id);
        parentComment.children.push(comment);
      } else {
  
        if (comment.parent && comment.parent._type === 'article') {
          nestedComments.push(comment);
        } else {
  
          const parentCommentId = comment.parent && comment.parent._id;
          const parentComment = commentMap.get(parentCommentId);
          if (parentComment) {
            parentComment.children.push(comment);
          } else {
  
            nestedComments.push(comment);
          }
        }
      }
    });
  
    return nestedComments;
}