/**
 * Добавление отступа
 * @returns {Array}
 */
export default function addIndents(arr) {
  let indent = 0;

  return arr.map((item) => {
    const increase = indent === 10? 0 : 1;
    indent = item.parent._type === 'article' ? 0 : indent + increase;
    return { ...item, indent: indent }
  })
}
