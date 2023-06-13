export function transformComments(comments) {
    const commentsMap = {};
    const rootComments = [];

    comments.forEach((comment) => {
      comment.children = [];
      commentsMap[comment._id] = comment;

      const parentId = comment.parent?._tree?.[0]._id;
      const parentComment = commentsMap[parentId];

      if (parentComment) {
        parentComment.children.push(comment);
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  };
