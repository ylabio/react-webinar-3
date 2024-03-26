export default function getNestedComments(comments) {
  const commentsMap = new Map();
  let rootComments = [];

  // Initialize the map with all comments, adding a placeholder for children
  comments.forEach((comment) => {
    commentsMap.set(comment._id, { ...comment, children: [] });
  });

  // Function to recursively find and assign children to their parents
  const assignChildren = (comment) => {
    // Find comments that are direct children of the current comment
    comments.forEach((childComment) => {
      if (childComment.parent && childComment.parent._id === comment._id) {
        const child = commentsMap.get(childComment._id);
        comment.children.push(child);
        assignChildren(child); // Recursively assign children to this child
      }
    });
  };

  // Identify root comments and build their trees
  comments.forEach((comment) => {
    if (!comment.parent || comment.parent._type === "article") {
      // Assuming root comments have 'article' type parents
      const rootComment = commentsMap.get(comment._id);
      assignChildren(rootComment);
      rootComments.push(rootComment);
    }
  });

  return rootComments;
}
