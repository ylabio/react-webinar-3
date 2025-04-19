export default function buildHierarchy(comments) {
  const map = {};
  const roots = [];

  // Создаем карту комментариев с пустыми children
  for (const comment of comments) {
    map[comment._id] = { ...comment, children: [] };
  }

  // Строим дерево и добавляем level
  for (const comment of comments) {
    if (comment.parent?._type === 'article') {
      map[comment._id].level = 0; // Корневые комментарии имеют level 0
      roots.push(map[comment._id]);
    } else if (comment.parent?._id && map[comment.parent._id]) {
      map[comment._id].level = map[comment.parent._id].level + 1; // Уровень дочернего комментария = уровень родителя + 1
      map[comment.parent._id].children.push(map[comment._id]);
    }
  }

  return roots;
}
