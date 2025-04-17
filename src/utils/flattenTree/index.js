export default function flattenTree(tree, level = 0) {
  const result = [];

  for (const item of tree) {
    result.push({ ...item, level });

    if (item.children?.length) {
      result.push(...flattenTree(item.children, level + 1));
    }
  }

  return result;
}
