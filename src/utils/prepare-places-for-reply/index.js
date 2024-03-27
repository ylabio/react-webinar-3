//здесь результат функции объект поэтому сложность доступа к ключу О(1) - а именно поиска
//последнего комментария в ветке по какому-нибудь комментарию из этого результирующего массива
//а всего сложность О(n)

export default function preparePlacesForReply(tree) {

    let accum = {};

    for (let child of tree) {
        let assoc = {};
        for (let child2 of tree) {
            child2.children.length ?
                (assoc = Object.assign(assoc, {[child2._id]: child2.children.slice(-1)[0]._id})) :
                (assoc = Object.assign(assoc, {[child2._id]: child2._id}));
        }
        accum = Object.assign(accum, assoc, preparePlacesForReply(child.children));
    }

    return accum;
}