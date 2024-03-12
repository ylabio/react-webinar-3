const elDisplayed = 3;

export const formPaginationArray = (currIndex, lastIndex) => {
  const newPagArr = [];
  newPagArr.push(1);
  newPagArr.push("...");
  let startIndex = currIndex - Math.floor(elDisplayed / 2);
  if (startIndex < 1) startIndex = 1;
  if (startIndex + elDisplayed > lastIndex)
    startIndex = lastIndex - elDisplayed + 1;

  for (let i = startIndex; i < startIndex + elDisplayed; i++) {
    newPagArr.push(i);
  }
  newPagArr.push("...");
  newPagArr.push(lastIndex);
  if (startIndex <= 2) {
    newPagArr.splice(startIndex - 1, 3 - startIndex);
  }
  if (startIndex >= lastIndex - elDisplayed) {
    newPagArr.splice(
      newPagArr.length - 2,
      elDisplayed + 1 - (lastIndex - startIndex)
    );
  }
  return newPagArr;
};
