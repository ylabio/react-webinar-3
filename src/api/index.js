class Api {
    static async getCatalog(skip = 0, limit = 10) {
      const url = `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(title, price),count`;
      const res = await fetch(url);
      console.log(res);
      return await res.json();
      
    }
    static async getItem(id) {
      const url = `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`;
      const res = await fetch(url);
      return await res.json();
    }
  }

  export default Api;