/**
 * // Функция для добавления нового комментария в дерево
 * @param comments {Object} Список объектов-комментариев
 * @param newComment {Object} Добавляемый комментарий
 * @param parent {Object} Отношение добавляемого объекта к типу комментария 'comment', 'article'
 * @returns {Object} Обновленный список комментариев
 */

export default function addCommentToTree (comments, newComment, parent) {
    // Если у нового комментария нет родителя, добавляем его на верхний уровень
    if (parent._type === "article") {
        return [...comments, newComment];
    }
    // Рекурсивная функция для поиска родителя и добавления нового комментария
    const findAndAdd = (comments) => {
        for (let comment of comments) {
        if (comment._id === parent._id) {
            // Если нашли родителя, добавляем новый комментарий в его children
            if (!comment.children) {
            comment.children = [];
            }
            comment.children.push(newComment);
            return true;
        }
        // Если у текущего комментария есть дочерние элементы, продолжаем поиск
        if (comment.children && findAndAdd(comment.children)) {
            return true;
        }
        }
        return false;
    };

    const updatedComments = [...comments];
    findAndAdd(updatedComments);

    return updatedComments; 
};
  