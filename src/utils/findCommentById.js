export default function findCommentById(comments, parentId) {
	for (const comment of comments) {
		if (comment._id === parentId) {
			return comment;
		}
		if (comment.children && comment.children.length > 0) {
			const nestedComment = findCommentById(comment.children, parentId);
			if (nestedComment) {
				return nestedComment;
			}
		}
	}

	return null;
};