class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async getCatalog(currentPage) {
    const response = await fetch(`${this.baseUrl}?limit=10&skip=${(currentPage - 1) * 10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    return json.result;
  }

  async getItem(id) {
    const response = await fetch(`${this.baseUrl}/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    return json.result;
  }
}

export const mainApi = new Api({
  baseUrl: "/api/v1/articles",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})