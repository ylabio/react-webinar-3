/**
 * Преобразование списка в иерархию
 * @param {Array} list - Список объектов с родительскими ссылками
 * @param {String} [key='_id'] - Свойство первичного ключа
 * @param {String} [rootParentType] - Тип родителя, узлы с таким типом считаются корневыми
 * @returns {Array} - Массив корневых узлов с вложенными children
 */
export default function listToTree(list, key = '_id', rootParentType) {
  const idMap = {};
  const roots = [];

  // Инициализация узлов и создание children
  for (const item of list) {
    idMap[item[key]] = { ...item, children: [] };
  }

  // Построение дерева
  for (const item of list) {
    const node = idMap[item[key]];
    const parent = item.parent;

    // Если есть родитель и тип родителя не совпадает с корневым типом, то добавляем к родителю
    if (parent?.[key] && (!rootParentType || parent._type !== rootParentType)) {
      const parentNode = idMap[parent[key]];
      if (parentNode) {
        parentNode.children.push(node);
      } else {
        // Родитель не найден в списке — считаем текущий узел корневым
        roots.push(node);
      }
    } else {
      // Нет родителя или тип родителя соответствует корневому типу
      roots.push(node);
    }
  }

  return roots;
}
