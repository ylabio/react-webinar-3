export default function buildCommentTree(comments = []) {
  const map = {};
  const roots = [];

  comments.forEach(comment => {
    map[comment._id] = { ...comment, replies: [] };
  });

  comments.forEach(comment => {
    if (comment.parent._type === 'comment') {
      const parent = map[comment.parent._id];
      if (parent) {
        parent.replies.push(map[comment._id]);
      }
    } else {
      roots.push(map[comment._id]);
    }
  });

  return roots;
};
