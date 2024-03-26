function findLastChildren(array) {
  let lastChildren = null;
  console.log("finlastChildren");
  function traverse(node) {
    if (!node.children || node.children.length === 0) {
      lastChildren = node;
    } else {
      for (let child of node.children) {
        traverse(child);
      }
    }
  }

  for (let item of array) {
    traverse(item);
  }
  if (lastChildren) return lastChildren._id;
}
export default findLastChildren;
