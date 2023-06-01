export function categoryListDataTransform(categoryList) {
  const result = [];
  const root = [];

  //parentId: childId[]
  const map = {};

  categoryList.forEach((category) => {
    if (category.parent === null) {
      root.push(category);
      return;
    }
    if (map[category.parent._id]) {
      map[category.parent._id].push(category);
      return;
    }
    map[category.parent._id] = [category];
  });

  root.forEach((category) => {
    let level = 0;
    result.push({ _id: category._id, title: category.title, level });

    if (map[category._id]) {
      const stack = [
        ...map[category._id].map((category) => ({
          category,
          level: level + 1,
        })),
      ];
      level++;
      while (stack.length > 0) {
        const currentCategory = stack.shift();
        if (currentCategory) {
          result.push({
            _id: currentCategory.category._id,
            title: currentCategory.category.title,
            level: currentCategory.level,
          });
          if (map[currentCategory.category._id]) {
            stack.unshift(
              ...map[currentCategory.category._id].map((item) => ({
                category: item,
                level: currentCategory.level + 1,
              })),
            );
          }
        }
      }
    }
  });

  return result;
}
