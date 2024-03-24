/**
 * Сортировка списка по свойству родительского элемента
 * @param list {Array} Список объектов с отношением на родителя
 * @param cb функция для преобразования элементов списка
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Отсортированный список
 */
export default function sortByParent(list, cb = (i) => i, key = '_id') {
  const result = [];
  const parentTable = list.reduce((table, cur) => {
    table[cur[key] + 'exist'] = true;
    if (!cur.parent) return table;
    if (!table[cur.parent[key]]) {
      table[cur.parent[key]] = [cur];
    } else {
      table[cur.parent[key]].push(cur);
    }
    return table;
  }, {});
  const collectFamily = (parent, level = 0) => {
    result.push(cb(parent, level));
    const children = parentTable[parent[key]];
    if (children) children.forEach((child) => collectFamily(child, level + 1));
  };
  list.forEach((item) => {
    if (item.parent && parentTable[item.parent[key] + 'exist']) return;
    collectFamily(item);
  });
  return result;
}
