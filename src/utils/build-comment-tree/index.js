/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
function buildCommentTree(comments) {
    const rootComments = comments
        .filter(c => c.parent?._type === 'article')
        .sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate)); 

    const commentMap = {};
    comments.forEach(comment => {
        comment.replies = [];
        commentMap[comment._id] = comment;
    });

    comments.forEach(comment => {
        if (comment.parent && comment.parent._type === 'comment') {
            const parentComment = commentMap[comment.parent._id];
            if (parentComment) {
                parentComment.replies.push(comment);
            }
        }
    });

    Object.values(commentMap).forEach(comment => {
        comment.replies.sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate));
    });

    return rootComments;
}

export default buildCommentTree;

