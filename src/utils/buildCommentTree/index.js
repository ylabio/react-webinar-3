export default function buildCommentTree(comments) {
  const map = {};
  const roots = [];

  for (const comment of comments) {
    map[comment._id] = { ...comment, children: [] };
  }

  for (const comment of comments) {
    if (comment.parent?._type === 'article') {
      roots.push(map[comment._id]);
    } else if (comment.parent?._id && map[comment.parent._id]) {
      map[comment.parent._id].children.push(map[comment._id]);
    }
  }

  return roots;
}
