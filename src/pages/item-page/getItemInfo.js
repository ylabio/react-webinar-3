export async function getItemInfo(id) {
  const url = `/api/v1/articles/${id}?fields=title,price,description,edition,madeIn(title,code),category(title)`;

  const response = await fetch(url);

  if (!response.ok) return Promise.reject(new Error('Bad response'));

  return response.json()
}