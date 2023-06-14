export default function getNormalComment(item, level) {
    const dateCreate = new Date(item.dateCreate);
    return {
            _id: item._id,
            name: item.author.profile.name,
            authorId: item.author._id,
            day: dateCreate.getDate(),
            month: `comments.${dateCreate.getMonth()}`,
            year: dateCreate.getFullYear(),
            hours: dateCreate.getHours() < 10 ? `0${dateCreate.getHours()}` : `${dateCreate.getHours()}`,
            minutes: dateCreate.getMinutes() < 10 ? `0${dateCreate.getMinutes()}` : `${dateCreate.getMinutes()}`,
            text: item.text,
            padding: 40 + (level <= 9 ? 30*level : 30*9),
            children: item.children,
            level: level
    }
}