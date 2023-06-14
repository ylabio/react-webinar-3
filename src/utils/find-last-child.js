export default function findLastChild(object) {
    if (object) {
        return  object.children.length ? findLastChild(object.children.at(-1)) : object._id
    }

    return null
}