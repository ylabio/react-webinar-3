/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, key = '_id') {
    const treeMap = {};
    const rootElements = [];

    // Создание индекса элементов
    list.forEach(item => {
        item.children = []; 
        treeMap[item[key]] = item;
    });

    // Построение дерева
    list.forEach(item => {
        if (item.parent) {
            const parentType = item.parent._type;
            if (parentType === 'article') {
                // Элемент является корневым комментарием
                rootElements.push(item);
            } else if (parentType === 'comment') {
                // Элемент является ответом на комментарий
                const parentComment = treeMap[item.parent[key]];
                if (parentComment) {
                    parentComment.replies = parentComment.replies || [];
                    parentComment.replies.push(item);
                }
            } else {
                // Элемент является подкатегорией
                const parentCategory = treeMap[item.parent[key]];
                if (parentCategory) {
                    parentCategory.children.push(item);
                }
            }
        } else {
            // Элемент не имеет родителя и является корневым элементом категории
            rootElements.push(item);
        }
    });

    // Сортировка, если это комментарии
    if (list.length > 0 && list[0].parent && list[0].parent._type === 'article') {
        rootElements.sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate));
        Object.values(treeMap).forEach(comment => {
            if (comment.replies) {
                comment.replies.sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate));
            }
        });
    }

    return rootElements;
}

