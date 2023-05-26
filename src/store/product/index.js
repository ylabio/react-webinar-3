import StoreModule from "../module";

class Product extends StoreModule {
  initState() {
    return { productDetails: {} };
  }

  async load(productId) {
    const res = await fetch(
      `/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`
    );
    const { result } = await res.json();
    this.setState({ ...this.getState(), productDetails: result });
  }
}

export default Product;
