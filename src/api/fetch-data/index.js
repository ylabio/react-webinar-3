import wrapPromise from "../wrap-promise";

function fetchData(url) {
  const promise = fetch(url)
    .then((response) => response.json())
    .then(({ result }) => result);

  return wrapPromise(promise);
}

export default fetchData;
