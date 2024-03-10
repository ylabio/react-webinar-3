const LIMIT = 4;

const getItems = (item, range) => {
  const result = [];

  for (let i = range[0]; i <= (range[1] ?? range[0]); i += 1) {
    result.push(item(i));
  }

  return result;
}

export const getCollection = (item) => (buttonAmount, currentPage) => {
  const collection = [];
  const delimiter = '...';

  if (buttonAmount <= LIMIT) return collection.push(...getItems(item, [0, 4]));

  if (currentPage <= 1) {

    collection.push(
      ...getItems(item, [0, 2]), 
      delimiter, 
      ...getItems(item, [buttonAmount - 1])
    )

  } else if (currentPage >= 2 && currentPage <= buttonAmount - 3) {

    collection.push(
      ...getItems(item, [0]), 
      currentPage - 1 > 1 && delimiter, 
      ...getItems(item, [currentPage - 1, currentPage + 1]), 
      currentPage + 2 < buttonAmount - 1 && delimiter, 
      ...getItems(item, [buttonAmount - 1])
    )

  } else if (currentPage >= buttonAmount - 2) {

    collection.push(
      ...getItems(item, [0]), 
      delimiter, 
      ...getItems(item, [buttonAmount - 3, buttonAmount - 1])
    )

  }

  return collection;
}