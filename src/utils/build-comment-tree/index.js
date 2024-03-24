/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
function buildCommentTree(comments) {
    const rootComments = comments.filter(c => c.parent?._type === 'article');
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

    return rootComments;
}
export default buildCommentTree;

