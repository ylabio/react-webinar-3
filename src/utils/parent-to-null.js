export default function parentToNull(articleId, items) {
  return items.map((item) => item.parent._id === articleId ? { ...item, parent: null } : item);
}