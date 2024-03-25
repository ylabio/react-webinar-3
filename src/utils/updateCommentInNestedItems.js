export default function updateCommentInNestedItems(items, updatedComment) {
	return items.map(comment => {
		if (comment._id === updatedComment._id) {
			return updatedComment;
		}
		if (comment.children && comment.children.length > 0) {
			return {
				...comment,
				children: updateCommentInNestedItems(comment.children, updatedComment)
			};
		}
		return comment;
	});
};