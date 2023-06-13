export default function (item, typeKey, type) {
  return item.parent[typeKey] === type;
}
