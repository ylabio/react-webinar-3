export function categoryListDataTransform(categoryList) {
  //Это константа, которой мы отмечаем корневые элементы
  //для уникальности сгенерирована через bash uuidgen (консольная утилита в linux)
  //что делает ее коллизию практически невероятной.
  //Но в принципе можно использовать любую константу.
  //Главное, что бы она гарантировано не совпадала с ИД элементов
  const ROOT_ID = 'ROOT_ID_c1bc6821-b622-473b-939d-d5e1cbae38ec';

  const result = [];

  // это картограф, который позволяет для каждого элемента получить его потомков по ИД элемента
  // и с О(n) = 1
  //parentId: childId[]
  const mapper = {};

  //Cобственно, заполнение картографа это 1 проход по массиву категорий, т.е. O(n) = n
  categoryList.forEach((category) => {
    const id = category.parent === null ? ROOT_ID : category.parent._id;
    if (mapper[id]) {
      mapper[id].push(category);
      return;
    }
    mapper[id] = [category];
  });

  //что бы не использовать рекурсию, создаем стек и ложем туда только корневые элементы
  const stack = mapper[ROOT_ID].map((category) => ({
    category,
    level: 0,
  }));

  //собственно проходим по стеку, пока там что-то есть

  while (stack.length > 0) {
    //берем первый элемент стека
    const currentCategory = stack.shift();
    // если он не пуст
    if (currentCategory) {
      // то ложем его в массив результатов
      result.push({
        _id: currentCategory.category._id,
        title: currentCategory.category.title,
        level: currentCategory.level,
      });
      // из картографа получаем данные для данного элемента стека
      const categoryData = mapper[currentCategory.category._id];
      // если у элемента стека есть дети, то сразу пачкой ложем их в начало стека, сохраняя их последовательность
      if (categoryData) {
        stack.unshift(
          ...categoryData.map((category) => ({
            category,
            level: currentCategory.level + 1,
          })),
        );
      }
    }
  }

  return result;
}
