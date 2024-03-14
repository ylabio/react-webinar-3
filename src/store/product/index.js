import StoreModule from "../module";

class Product extends StoreModule {
  async loadProductContent(id, language) {
    const productUrl = `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)&lang=${language}`
    const response = await fetch(productUrl);

    const json =  await response.json();

    return { ...json.result, };
  }
}

export default Product;
