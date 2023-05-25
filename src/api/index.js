export async function getProductList(limit, skip) {
  const url = `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`;
  const response = await fetch(url);
  const json = await response.json();
  console.log(json.result);
  return json.result;
}

export async function getFullProductData(id) {
  const url = `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`;
  const response = await fetch(url);
  const json = await response.json();
  return json.result;
}

export async function getProductData(id) {
  const url = `/api/v1/articles/${id}?fields=_id,title,price`;
  const response = await fetch(url);
  const json = await response.json();
  return json.result;
}


