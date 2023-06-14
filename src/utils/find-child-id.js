/**
 * Ищем id дочернего элемента комментария
 * @param {Object[]} arr 
 * @param {string} id 
 * @returns {string | null}
 */
export default function findChildId(arr, id) {

    const res = arr.filter(comment => comment._id === id)[0];

    if (!res) return id;
    if (id === null) return id;
    if (res.children.length === 0) return id;

    const lastChild = res.children.slice(-1);

    return lastChild[0]._id;
}