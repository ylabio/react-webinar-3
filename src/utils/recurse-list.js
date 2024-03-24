/**
 * Функция рекурсивного обхода массива, которая находит родительские элементы, 
 * в них создает новый параметр replies, и в него добавляет те элементы, чьи parent id равны id родительского компонента.
 * @param {Array} list 
 * @param {String} parentId 
 * @return {Array}
 */
export function recurseList(list, parentId) {
  const res = [...list];

  return res
    .filter(item => item.parent._id === parentId)
    .map(item => ({
      ...item,
      replies: recurseList(list, item._id)
    }))
}