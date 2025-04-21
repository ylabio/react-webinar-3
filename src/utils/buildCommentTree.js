export default function buildCommentTree(comments = []) {
  const map = {};
  const roots = [];

  comments.forEach(comment => {
    map[comment._id] = { ...comment, children: [] };
  });

  comments.forEach(comment => {
    if (comment.parent._type === 'comment') {
      const parent = map[comment.parent._id];
      if (parent) {
        parent.children.push(map[comment._id]);
      }
    } else {
      roots.push(map[comment._id]);
    }
  });

  return roots;
};
